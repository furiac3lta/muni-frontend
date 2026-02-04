import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response';

interface LoginResponse {
  token: string;
  username: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/auth`;
  private readonly tokenKey = 'municipio_admin_token';
  private readonly userKey = 'municipio_admin_user';
  private readonly roleKey = 'municipio_admin_role';

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<ApiResponse<LoginResponse>>(`${this.baseUrl}/login`, { username, password })
      .pipe(
        map((response) => response.data),
        tap((data) => {
          this.setToken(data.token);
          this.setUser(data.username, data.role);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    localStorage.removeItem(this.roleKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUsername(): string | null {
    return localStorage.getItem(this.userKey);
  }

  getRole(): string | null {
    return localStorage.getItem(this.roleKey);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private setUser(username: string, role: string): void {
    localStorage.setItem(this.userKey, username);
    localStorage.setItem(this.roleKey, role);
  }
}
