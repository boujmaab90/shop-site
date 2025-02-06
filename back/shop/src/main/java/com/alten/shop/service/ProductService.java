package com.alten.shop.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alten.shop.entity.Product;
import com.alten.shop.repository.ProductRepository;

@Service
public class ProductService {
	@Autowired
	private ProductRepository productRepository;

	public Product save(Product product) {
		return productRepository.save(product);
	}

	public List<Product> findAll() {
		return productRepository.findAll();
	}

	public Optional<Product> findById(Long id) {
		return productRepository.findById(id);
	}

	public Optional<Product> findByCode(String code) {
		return productRepository.findByCode(code);
	}

	public boolean deleteById(Long id) {
		productRepository.deleteById(id);
		return true;
	}
}
