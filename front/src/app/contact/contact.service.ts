import { Injectable, inject, signal } from "@angular/core";
import { Product } from "./cart.model";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of, tap } from "rxjs";
import { Contact } from "./contact.model";

@Injectable({
    providedIn: "root"
}) export class ContactService {

  sendMessage(contact: Contact): void {
    // Pour stocker le message envoyé dans la base de données
  }

  getHistoriqueEchange(): Observable<Contact> {
    // Pour stocker le message envoyé dans la base de données
    return new Observable();
  }
}