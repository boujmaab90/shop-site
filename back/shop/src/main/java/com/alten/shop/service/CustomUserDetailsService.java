package com.alten.shop.service;

import java.util.Collections;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.alten.shop.entity.User;
import com.alten.shop.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Récupère l'utilisateur par email (utilisé comme "username")
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> 
                new UsernameNotFoundException("Aucun utilisateur trouvé avec l'email : " + email)
            );

        // Convertit l'entité User en UserDetails de Spring Security
        return org.springframework.security.core.userdetails.User.builder()
            .username(user.getEmail())
            .password(user.getPassword())
            .authorities(Collections.emptyList()) // Aucun rôle nécessaire
            .build();
    }
}
