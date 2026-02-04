import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { ApiResponse } from '../models/api-response';
import { PublicService } from '../models/public-service';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PublicServicesService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/services`;

  getServices(): Observable<PublicService[]> {
    return this.http
      .get<ApiResponse<PublicService[]>>(this.baseUrl)
      .pipe(map((response) => response.data));
  }

  createService(payload: Partial<PublicService>): Observable<PublicService> {
    return this.http
      .post<ApiResponse<PublicService>>(`${environment.apiBaseUrl}/admin/services`, payload)
      .pipe(map((response) => response.data));
  }

  updateService(id: number, payload: Partial<PublicService>): Observable<PublicService> {
    return this.http
      .put<ApiResponse<PublicService>>(`${environment.apiBaseUrl}/admin/services/${id}`, payload)
      .pipe(map((response) => response.data));
  }
}
