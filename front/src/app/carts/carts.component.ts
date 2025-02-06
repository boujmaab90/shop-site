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

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  removeFromCart(product: Product): void {
    this.cartService.removeFromCart(product);
    this.cartItems = this.cartService.getCartItems();
  }
}
