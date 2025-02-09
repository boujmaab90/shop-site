import { Injectable, inject, signal } from "@angular/core";
import { Product } from "./product.model";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of, tap } from "rxjs";
import { environment } from "environments/environment";
import { NgxPaginationModule, PaginatePipe } from 'ngx-pagination';
import { PageableInfo } from "app/shared/model/pageable-info.model";

@Injectable({
    providedIn: "root"
}) export class ProductsService {

    constructor(private http: HttpClient) {}

    private readonly path = "api/products";
    
    private readonly _products = signal<Product[]>([]);

    public readonly products = this._products.asReadonly();

    public get(paramsPage: any): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/${this.path}`, {params: paramsPage}).pipe(
            catchError((error) => {
                // For tests only
                //return this.http.get<Product[]>("assets/products.json");
                console.error('Erreur API:', error);
                return of([]); // Retourner rien par defaut
            }),
            tap((response) => {
              let products = response.content as Product[];
              this._products.set(products)
    }),
        );
    }

    public create(product: Product): Observable<boolean> {
        return this.http.post<boolean>(`${environment.apiUrl}/${this.path}`, product).pipe(
            catchError(error => {
              console.error('Erreur API:', error);
              return of(false); // Retourner false dans le cas d'une erreur
            })
          );
    }

    public update(product: Product): Observable<boolean> {
        return this.http.patch<boolean>(`${environment.apiUrl}/${this.path}/${product.id}`, product).pipe(
            catchError(error => {
              console.error('Erreur API:', error);
              return of(false); // Retourner false dans le cas d'une erreur
            })
          );
    }

    public delete(productId: number): Observable<boolean> {
        return this.http.delete<boolean>(`${environment.apiUrl}/${this.path}/${productId}`).pipe(
            catchError(error => {
              console.error('Erreur API:', error);
              return of(false); // Retourner false dans le cas d'une erreur
            })
          );
    }
}