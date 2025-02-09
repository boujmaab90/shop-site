import { NgFor } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { CartService } from "app/carts/carts.service";
import { Product } from "app/products/data-access/product.model";
import { ProductFormComponent } from "app/products/ui/product-form/product-form.component";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';


@Component({
  selector: "app-carts",
  templateUrl: "./carts.component.html",
  styleUrls: ["./carts.component.scss"],
  standalone: true,
  imports: [ NgFor, DataViewModule, CardModule, ButtonModule, DialogModule, ProductFormComponent],
})
export class CartsComponent implements OnInit {
  cartItems: Product[] = [];
  totalAmount: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    //this.cartItems = this.cartService.getCartItems();
    this.cartService.cartItems$.subscribe((products) => {
      this.cartItems = products;
      this.totalAmount = this.cartService.getTotalAmount();
    });
  }

  // Augmenter la quantité d'un article
  increaseQuantity(product: Product) {
    this.cartService.updateQuantity(product.id, product.quantity + 1);
  }

  // Réduire la quantité d'un article
  decreaseQuantity(product: Product) {
    if (product.quantity > 1) {
      this.cartService.updateQuantity(product.id, product.quantity - 1);
    } else {
      this.cartService.removeFromCart(product.id); // Supprimer l'article si la quantité est 1
    }
  }

  // Supprimer un article du panier
  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product.id);
  }
}
