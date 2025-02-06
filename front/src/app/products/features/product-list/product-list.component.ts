import { NgIf } from "@angular/common";
import { Component, OnInit, inject, signal } from "@angular/core";
import { AuthService } from "app/authentification/authentification.service";
import { CartService } from "app/carts/carts.service";
import { Product } from "app/products/data-access/product.model";
import { ProductsService } from "app/products/data-access/products.service";
import { ProductFormComponent } from "app/products/ui/product-form/product-form.component";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import * as uuid from "uuid";


const emptyProduct: Product = {
  id: 0,
  code: "",
  name: "",
  description: "",
  image: "",
  category: "",
  price: 0,
  quantity: 0,
  internalReference: "",
  shellId: 0,
  inventoryStatus: "INSTOCK",
  rating: 0,
  createdAt: 0,
  updatedAt: 0,
};

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
  standalone: true,
  imports: [NgIf, DataViewModule, CardModule, ButtonModule, DialogModule, ProductFormComponent],
})
export class ProductListComponent implements OnInit {
  private readonly productsService = inject(ProductsService);

  public readonly products = this.productsService.products;
  productsList: Product[] = [];

  public isDialogVisible = false;
  public isCreation = false;
  public isAdmin = false;
  public readonly editedProduct = signal<Product>(emptyProduct);

  constructor(
    private productService: ProductsService,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.reload();
    this.isAdmin = this.authService.isAdmin();
  }

  public reload() {
    this.productsService.get().subscribe(products => {this.productsList = products});
  }
  public onCreate() {
    this.isCreation = true;
    this.isDialogVisible = true;
    this.editedProduct.set(emptyProduct);
  }

  public onUpdate(product: Product) {
    this.isCreation = false;
    this.isDialogVisible = true;
    this.editedProduct.set(product);
  }

  public onDelete(product: Product) {
    this.productsService.delete(product.id).subscribe(t => this.reload());
  }

  public onSave(product: Product) {
    if (this.isCreation) {
      product.code = uuid.v4();
      product.createdAt = new Date().getTime();
      product.updatedAt = new Date().getTime();
      this.productsService.create(product).subscribe(t => this.reload());
    } else {
      product.updatedAt = new Date().getTime();
      this.productsService.update(product).subscribe(t => this.reload());
    }
    this.closeDialog();
  }
  public addToCart(product: Product) {
    console.log("ajouter au panier")
    this.cartService.addToCart(product);
  }

  public onCancel() {
    this.closeDialog();
  }

  private closeDialog() {
    this.isDialogVisible = false;
  }
}
