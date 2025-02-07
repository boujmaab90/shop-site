package com.alten.shop.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alten.shop.entity.Product;
import com.alten.shop.service.ProductService;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    // Récupérer tous les produits
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.findAll());
    }

    // Récupérer un produit en particulier par son id
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable Long id) {
    	if (productService.findById(id).isPresent()) { return ResponseEntity.ok(productService.findById(id).get());}
    	else {
    		//throw new NoSuchElementException("Le produit avec id "+id+" n'existe pas");
    		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    	}
    }

    // Mise à jour partielle (PATCH)
    @PatchMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product product, Principal principal) {
        
    	if (!"admin@admin.com".equals(principal.getName())) { return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); }
        
    	else if (productService.findById(id).isPresent()){
        	return ResponseEntity.ok(productService.updateProduct(product));
        }
        else {
    		//throw new NoSuchElementException("Le produit avec id "+id+" n'existe pas");
    		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    	}
    }
    
    // Suppression d'un produit
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatusCode> deleteProduct(@PathVariable Long id, Principal principal) {
        
    	if (!"admin@admin.com".equals(principal.getName())) { return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); }
        
        else if (productService.findById(id).isPresent()) {
        	productService.deleteById(id);
        	return ResponseEntity.ok(HttpStatus.NO_CONTENT);
        }
        else {
    		//throw new NoSuchElementException("Le produit avec id "+id+" n'existe pas");
    		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    	}
    }

    @PostMapping
    //@PreAuthorize("#email == authentication.principal")
    public ResponseEntity<Product> createProduct(@RequestBody Product product, Principal principal) {
        if (!"admin@admin.com".equals(principal.getName())) { // seul un profil Admin peut Créer un produit
            //throw new AccessDeniedException("Accès refusé");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        return ResponseEntity.ok(productService.save(product));
    }
}
