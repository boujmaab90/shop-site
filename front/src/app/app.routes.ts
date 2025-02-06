import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./shared/features/home/home.component";
import { LoginComponent } from "./authentification/login.component";
import { NgModule } from "@angular/core";
import { AuthGuard } from "./authentification/auth.guard";
import { CartsComponent } from "./carts/carts.component";

export const APP_ROUTES: Routes = [
  { path: "login", component: LoginComponent },
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: "products", canActivate: [AuthGuard],
    loadChildren: () =>
      import("./products/products.routes").then((m) => m.PRODUCTS_ROUTES)
  },
  {
    path: "carts", component: CartsComponent, canActivate: [AuthGuard] },
  { path: "", redirectTo: "/login", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {}