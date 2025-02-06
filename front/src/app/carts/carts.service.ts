import { Injectable, inject, signal } from "@angular/core";
import { Product } from "./cart.model";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of, tap } from "rxjs";

@Injectable({
    providedIn: "root"
}) export class CartService {

    private cartItems: Product[] = [];

  addToCart(product: Product): void {
    this.cartItems.push(product);
  }

  removeFromCart(product: Product): void {
    this.cartItems = this.cartItems.filter(item => item.id !== product.id);
  }

  getCartItems(): Product[] {
    return this.cartItems;
  }

  getCartCount(): number {
    return this.cartItems.length;
  }
}