import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { ApiResponse } from '../models/api-response';
import { environment } from '../../environments/environment';

export interface AdminUser {
  id: number;
  username: string;
  role: 'ADMIN' | 'EDITOR';
  active: boolean;
}

export interface AdminUserRequest {
  username: string;
  password?: string;
  role: 'ADMIN' | 'EDITOR';
  active?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AdminUsersService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/admin/users`;

  getUsers(): Observable<AdminUser[]> {
    return this.http.get<ApiResponse<AdminUser[]>>(this.baseUrl).pipe(map((res) => res.data));
  }

  createUser(payload: AdminUserRequest): Observable<AdminUser> {
    return this.http.post<ApiResponse<AdminUser>>(this.baseUrl, payload).pipe(map((res) => res.data));
  }

  updateUser(id: number, payload: AdminUserRequest): Observable<AdminUser> {
    return this.http
      .put<ApiResponse<AdminUser>>(`${this.baseUrl}/${id}`, payload)
      .pipe(map((res) => res.data));
  }
}
