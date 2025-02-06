package com.alten.shop.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.alten.shop.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
	
    Optional<User> findByEmail(String email);
    
}
