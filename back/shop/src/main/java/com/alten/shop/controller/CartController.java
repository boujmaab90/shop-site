package com.alten.shop.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alten.shop.entity.Cart;
import com.alten.shop.entity.Product;
import com.alten.shop.service.CartService;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    @Autowired
    private CartService cartService;

    @GetMapping()
    public ResponseEntity<Cart> getUsersCart(Principal principal) {
        String email = principal.getName();
        return ResponseEntity.ok(cartService.getUsersCart(email));
    }
    @PostMapping("/add")
    public ResponseEntity<Cart> addToCart(@RequestBody Product product, Principal principal) {
        String email = principal.getName();
        return ResponseEntity.ok(cartService.addToCart(email, product));
    }
    
    @DeleteMapping("/remove")
    public ResponseEntity<Cart> removeFromCart(@RequestBody Product product, Principal principal) {
        String email = principal.getName();
        return ResponseEntity.ok(cartService.removeFromCart(email, product));
    }
}
