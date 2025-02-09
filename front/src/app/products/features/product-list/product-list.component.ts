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
import { PageableInfo } from "app/shared/model/pageable-info.model";
import { NgxPaginationModule } from "ngx-pagination";

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
  imports: [ DataViewModule, CardModule, ButtonModule, DialogModule, ProductFormComponent, NgxPaginationModule ],
})
export class ProductListComponent implements OnInit {
  private readonly productsService = inject(ProductsService);

  public readonly products = this.productsService.products;
  productsList: Product[] = [];

  public isDialogVisible = false;
  public isCreation = false;
  public isAdmin = false;
  public readonly editedProduct = signal<Product>(emptyProduct);
  public showNotification: boolean = false;
  showNotificationForProductId : number | null = null;
  selectedProduct: any = null; // Produit sélectionné pour la modal
  isDialogInfoVisible: boolean = false; // Contrôle l'affichage de la modal
  defaultImage: string = "assets/images/default-image.png";
  
  totalProducts = 0;
  pageNumber = 1;
  pageSize = 2;
  pageSizes = [2, 6, 10]

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
    let param:any = {}
    param['pageNumber'] = this.pageNumber-1;
    param['pageSize'] = this.pageSize;
    this.productsService.get(param).subscribe(pageableInfo => {
          console.log(pageableInfo);
          this.productsList = pageableInfo.content as Product[];
          this.totalProducts = pageableInfo.totalElements;
        });
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
  
  // Ouvrir la modal avec les informations du produit
  openProductModal(product: Product) {
    this.selectedProduct = product;
    this.isDialogInfoVisible = true;
  }
  public addToCart(product: Product) {
    this.cartService.addToCart(product);
    // Activer la notification pour ce produit
    this.showNotificationForProductId = product.id;
    // Masquer la notification après 2 secondes
    setTimeout(() => {
      this.showNotification = false;
    }, 2000);
  }

  public onCancel() {
    this.closeDialog();
  }

  private closeDialog() {
    this.isDialogVisible = false;
  }

  handlePageChange(event: any): void {
    this.pageNumber = event;
    this.reload();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.pageNumber = 1;
    this.reload();
  }
}
