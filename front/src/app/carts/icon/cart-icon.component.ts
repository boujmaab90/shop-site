import { NgFor } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CartService } from "app/carts/carts.service";
import { Product } from "app/products/data-access/product.model";
import { ProductFormComponent } from "app/products/ui/product-form/product-form.component";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';


@Component({
  selector: "app-cart-icon",
  templateUrl: "./cart-icon.component.html",
  styleUrls: ["./cart-icon.component.scss"],
  standalone: true,
  imports: [ CardModule, RouterModule],
})
export class CartIconComponent implements OnInit {
  itemCount: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // Surveiller les changements dans le panier
    this.cartService.cartItems$.subscribe((items) => {
      this.itemCount = items.map(item => item.quantity).reduce((a, b) => a + b, 0)
    });
    
    //this.cartService.itemCount$.subscribe((itemCount) => this.itemCount = itemCount);
  }
}
