package com.alten.shop.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.alten.shop.entity.Cart;
import com.alten.shop.entity.User;

public interface CartRepository extends JpaRepository<Cart, Long> {
	
	Optional<Cart> findByUser(User userId);

}
