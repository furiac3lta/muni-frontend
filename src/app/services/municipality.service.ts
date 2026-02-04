import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { ApiResponse } from '../models/api-response';
import { MunicipalInfo } from '../models/municipal-info';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MunicipalityService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/municipality`;

  getInfo(): Observable<MunicipalInfo> {
    return this.http
      .get<ApiResponse<MunicipalInfo>>(`${this.baseUrl}/info`)
      .pipe(map((response) => response.data));
  }

  updateInfo(payload: Partial<MunicipalInfo>): Observable<MunicipalInfo> {
    return this.http
      .put<ApiResponse<MunicipalInfo>>(`${environment.apiBaseUrl}/admin/municipality/info`, payload)
      .pipe(map((response) => response.data));
  }
}
