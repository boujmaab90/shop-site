package com.alten.shop.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.alten.shop.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findByCode(String code);
    
}
