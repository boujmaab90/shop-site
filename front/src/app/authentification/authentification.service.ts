import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, tap } from "rxjs";
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  
  private readonly TOKEN_KEY = 'jwt_token';
  private readonly EMAIL = "email";

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${environment.apiUrl}/token`, { "email": email, "password": password })
    .pipe(
      tap(response => {
        localStorage.setItem(this.EMAIL, email);
        localStorage.setItem(this.TOKEN_KEY, response.token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
    this.router.navigate(['/login']);
  }
  
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAdmin(): boolean {
    return localStorage.getItem(this.EMAIL)=="admin@admin.com";
  }
}
