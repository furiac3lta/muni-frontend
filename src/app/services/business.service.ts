import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { ApiResponse } from '../models/api-response';
import { Business } from '../models/business';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BusinessService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/business`;

  getBusinesses(): Observable<Business[]> {
    return this.http
      .get<ApiResponse<Business[]>>(this.baseUrl)
      .pipe(map((response) => response.data));
  }

  createBusiness(payload: Partial<Business>): Observable<Business> {
    return this.http
      .post<ApiResponse<Business>>(`${environment.apiBaseUrl}/admin/business`, payload)
      .pipe(map((response) => response.data));
  }

  updateBusiness(id: number, payload: Partial<Business>): Observable<Business> {
    return this.http
      .put<ApiResponse<Business>>(`${environment.apiBaseUrl}/admin/business/${id}`, payload)
      .pipe(map((response) => response.data));
  }
}
