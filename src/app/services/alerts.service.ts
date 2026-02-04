import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { ApiResponse } from '../models/api-response';
import { AlertItem } from '../models/alert';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AlertsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/alerts`;

  getAlerts(): Observable<AlertItem[]> {
    return this.http
      .get<ApiResponse<AlertItem[]>>(this.baseUrl)
      .pipe(map((response) => response.data));
  }

  createAlert(payload: Partial<AlertItem>): Observable<AlertItem> {
    return this.http
      .post<ApiResponse<AlertItem>>(`${environment.apiBaseUrl}/admin/alerts`, payload)
      .pipe(map((response) => response.data));
  }

  updateAlert(id: number, payload: Partial<AlertItem>): Observable<AlertItem> {
    return this.http
      .put<ApiResponse<AlertItem>>(`${environment.apiBaseUrl}/admin/alerts/${id}`, payload)
      .pipe(map((response) => response.data));
  }
}
