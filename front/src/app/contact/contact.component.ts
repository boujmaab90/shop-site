import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";


@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"],
  standalone: true,
  imports: [ FormsModule , ReactiveFormsModule ],
})
export class ContactComponent {
  submitted = false;

  constructor() {
  }

  onSubmit() {
    this.submitted = true;
    // Faire appel au service backend afin de stocker le contact et son message
  }
}
