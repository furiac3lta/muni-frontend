import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { ApiResponse } from '../models/api-response';
import { TouristPlace } from '../models/tourism';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TourismService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/tourism`;

  getPlaces(): Observable<TouristPlace[]> {
    return this.http
      .get<ApiResponse<TouristPlace[]>>(this.baseUrl)
      .pipe(
        map((response) =>
          response.data.map((place) => ({
            ...place,
            imageUrls: place.imageUrls?.length
              ? place.imageUrls
              : place.imageUrl
                ? [place.imageUrl]
                : []
          }))
        )
      );
  }

  createPlace(payload: Partial<TouristPlace>): Observable<TouristPlace> {
    return this.http
      .post<ApiResponse<TouristPlace>>(`${environment.apiBaseUrl}/admin/tourism`, payload)
      .pipe(map((response) => response.data));
  }

  updatePlace(id: number, payload: Partial<TouristPlace>): Observable<TouristPlace> {
    return this.http
      .put<ApiResponse<TouristPlace>>(`${environment.apiBaseUrl}/admin/tourism/${id}`, payload)
      .pipe(map((response) => response.data));
  }
}
