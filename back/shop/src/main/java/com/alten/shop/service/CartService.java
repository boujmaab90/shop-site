package com.alten.shop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alten.shop.entity.Cart;
import com.alten.shop.entity.Product;
import com.alten.shop.entity.User;
import com.alten.shop.repository.CartRepository;
import com.alten.shop.repository.UserRepository;

@Service
public class CartService {

	@Autowired
	private ProductService productService;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private CartRepository cartRepository;

	public Cart getCartByUser(String email) {
		
		User user = userRepository.findByEmail(email).orElseThrow();
		return cartRepository.findByUser(user).orElseGet(null);
	}

	public Cart addToCart(String email, Product product) {
		
		Product productToAdd = productService.findByCode(product.getCode()).orElse(null);
		
		if (productToAdd != null) {
			User user = userRepository.findByEmail(email).orElseThrow();
			Cart cart = cartRepository.findByUser(user).orElseGet(null);
			
			if (cart != null) {
				cart.getProducts().add(productToAdd);
				return cartRepository.save(cart);
			}
			else {
				return null;
			}
		}
		return null;
	}

	public Cart removeFromCart(String email, Product product) {
		
		Product productToRemove = productService.findByCode(product.getCode()).orElse(null);
		
		if (productToRemove != null) {
			User user = userRepository.findByEmail(email).orElseThrow();
			Cart cart = cartRepository.findByUser(user).orElseGet(null);
			
			if (cart != null) {
				cart.getProducts().remove(productToRemove);
				return cartRepository.save(cart);
			}
			else {
				return null;
			}
		}
		return null;
	}

}
