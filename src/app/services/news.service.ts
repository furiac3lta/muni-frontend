import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { ApiResponse } from '../models/api-response';
import { NewsItem } from '../models/news';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class NewsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/news`;

  getNews(): Observable<NewsItem[]> {
    return this.http.get<ApiResponse<NewsItem[]>>(this.baseUrl).pipe(map((response) => response.data));
  }

  createNews(payload: Partial<NewsItem>): Observable<NewsItem> {
    return this.http
      .post<ApiResponse<NewsItem>>(`${environment.apiBaseUrl}/admin/news`, payload)
      .pipe(map((response) => response.data));
  }

  updateNews(id: number, payload: Partial<NewsItem>): Observable<NewsItem> {
    return this.http
      .put<ApiResponse<NewsItem>>(`${environment.apiBaseUrl}/admin/news/${id}`, payload)
      .pipe(map((response) => response.data));
  }

  deleteNews(id: number): Observable<NewsItem> {
    return this.http
      .delete<ApiResponse<NewsItem>>(`${environment.apiBaseUrl}/admin/news/${id}`)
      .pipe(map((response) => response.data));
  }
}
