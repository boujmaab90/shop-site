import { Injectable, inject, signal } from "@angular/core";
import { Product } from "app/products/data-access/product.model";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of, tap, BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root"
}) export class CartService {

    private cartItems = new BehaviorSubject<Product[]>([]); // Utilisez un BehaviorSubject pour stocker les articles du panier
    cartItems$ = this.cartItems.asObservable(); // Observable pour surveiller les changements

    // Ajouter un article au panier
  addToCart(product: Product) {
    const currentItems = this.cartItems.getValue();
    const existingItem = currentItems.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1; // Augmenter la quantité si l'article existe déjà
    } else {
      currentItems.push({ ...product, quantity: 1 }); // Ajouter un nouvel article
    }
    
    this.cartItems.next([...currentItems]);
  }


  // Supprimer un article du panier
  removeFromCart(productId: number): void {
    const currentItems = this.cartItems.getValue().filter((item) => item.id !== productId);
    //this.itemCount.next(this.itemCount.getValue()-1);
    this.cartItems.next([...currentItems]);
  }

  // Mettre à jour la quantité d'un article
  updateQuantity(productId: number, quantity: number) {
    const currentItems = this.cartItems.getValue();
    const itemToUpdate = currentItems.find((item) => item.id === productId);

    if (itemToUpdate) {
      itemToUpdate.quantity = quantity;
      this.cartItems.next([...currentItems]);
    }
  }

  // Récupèrer les produits
  getCartItems(): Product[] {
    return this.cartItems.getValue();
  }

  // Récupèrer le nombre total des produits
  getCartCount(): number {
    return this.cartItems.getValue().length;
  }

  // Calculer le montant total du panier
  getTotalAmount(): number {
    return this.cartItems.getValue().reduce((total, item) => total + item.price * item.quantity, 0);
  }
}