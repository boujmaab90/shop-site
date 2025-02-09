import {
  Component,
} from "@angular/core";
import { RouterModule } from "@angular/router";
import { SplitterModule } from 'primeng/splitter';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelMenuComponent } from "./shared/ui/panel-menu/panel-menu.component";
import { CartIconComponent } from "./carts/icon/cart-icon.component";
import { AuthGuard } from "./authentification/auth.guard";
import { AuthService } from "./authentification/authentification.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [RouterModule, SplitterModule, ToolbarModule, PanelMenuComponent, CartIconComponent],
})
export class AppComponent {
  title = "ALTEN SHOP";

  constructor(private authService: AuthService) {}

  displayLogout(): boolean {
    return this.authService.isLoggedIn()
  }
  logout() {
    this.authService.logout();
  }
}