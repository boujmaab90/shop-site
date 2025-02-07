import { Injectable, inject, signal } from "@angular/core";
import { Product } from "./cart.model";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of, tap, BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root"
}) export class CartService {

    private cartItems = new BehaviorSubject<Product[]>([]); // Utilisez un BehaviorSubject pour stocker les articles du panier
    cartItems$ = this.cartItems.asObservable(); // Observable pour surveiller les changements

    // Ajouter un article au panier
  addToCart(item: any) {
    const currentItems = this.cartItems.getValue();
    this.cartItems.next([...currentItems, item]);
  }

  // Récupérer le nombre d'articles dans le panier
  getCartItemCount(): number {
    return this.cartItems.getValue().length;
  }

  removeFromCart(product: Product): void {
    this.cartItems.next(this.cartItems.getValue().filter(item => item.id !== product.id));
  }

  getCartItems(): Product[] {
    return this.cartItems.getValue();
  }

  getCartCount(): number {
    return this.cartItems.getValue().length;
  }
}