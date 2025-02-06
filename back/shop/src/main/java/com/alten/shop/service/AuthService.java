package com.alten.shop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.alten.shop.dto.LoginDto;
import com.alten.shop.dto.UserRegistrationDto;
import com.alten.shop.entity.User;
import com.alten.shop.repository.UserRepository;
import com.alten.shop.utils.JwtUtil;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtil jwtUtil;

    // Création d'un utilisateur
    public User registerUser(UserRegistrationDto dto) {
        if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new RuntimeException("Email déjà utilisé");
        }
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setFirstname(dto.getFirstname());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        User userfinal = userRepository.save(user);
        return userfinal;
    }

    // Génération du token JWT
    public String authenticateUser(LoginDto dto) {
        User user = userRepository.findByEmail(dto.getEmail())
            .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new RuntimeException("Mot de passe incorrect");
        }
        return jwtUtil.generateToken(user.getEmail());
    }
}