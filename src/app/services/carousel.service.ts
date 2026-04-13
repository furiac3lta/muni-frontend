import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { ApiResponse } from '../models/api-response';
import { CarouselSlide } from '../models/carousel-slide';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CarouselService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/carousel`;

  getSlides(): Observable<CarouselSlide[]> {
    return this.http.get<ApiResponse<CarouselSlide[]>>(this.baseUrl).pipe(map((response) => response.data));
  }

  createSlide(payload: Partial<CarouselSlide>): Observable<CarouselSlide> {
    return this.http
      .post<ApiResponse<CarouselSlide>>(`${environment.apiBaseUrl}/admin/carousel`, payload)
      .pipe(map((response) => response.data));
  }

  updateSlide(id: number, payload: Partial<CarouselSlide>): Observable<CarouselSlide> {
    return this.http
      .put<ApiResponse<CarouselSlide>>(`${environment.apiBaseUrl}/admin/carousel/${id}`, payload)
      .pipe(map((response) => response.data));
  }

  deleteSlide(id: number): Observable<CarouselSlide> {
    return this.http
      .delete<ApiResponse<CarouselSlide>>(`${environment.apiBaseUrl}/admin/carousel/${id}`)
      .pipe(map((response) => response.data));
  }
}
