package com.alten.shop.utils;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtResponse {
	private String token; // Le token JWT
    private String email; // L'email de l'utilisateur (optionnel)
}
