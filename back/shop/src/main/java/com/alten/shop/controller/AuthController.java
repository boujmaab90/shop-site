package com.alten.shop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.alten.shop.dto.LoginDto;
import com.alten.shop.dto.UserRegistrationDto;
import com.alten.shop.entity.User;
import com.alten.shop.service.AuthService;
import com.alten.shop.utils.JwtResponse;

@RestController
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/account")
    public ResponseEntity<User> register(@RequestBody UserRegistrationDto dto) {
        return ResponseEntity.ok(authService.registerUser(dto));
    }

    @PostMapping("/token")
    public ResponseEntity<?> login(@RequestBody LoginDto dto) {
    	String token = authService.authenticateUser(dto);
    	return ResponseEntity.ok(new JwtResponse(token, dto.getEmail()));
    }
}