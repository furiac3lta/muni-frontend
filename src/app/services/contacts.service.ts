import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { ApiResponse } from '../models/api-response';
import { EmergencyContact } from '../models/contact';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ContactsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/contacts`;

  getContacts(): Observable<EmergencyContact[]> {
    return this.http
      .get<ApiResponse<EmergencyContact[]>>(this.baseUrl)
      .pipe(map((response) => response.data));
  }

  createContact(payload: Partial<EmergencyContact>): Observable<EmergencyContact> {
    return this.http
      .post<ApiResponse<EmergencyContact>>(`${environment.apiBaseUrl}/admin/contacts`, payload)
      .pipe(map((response) => response.data));
  }

  updateContact(id: number, payload: Partial<EmergencyContact>): Observable<EmergencyContact> {
    return this.http
      .put<ApiResponse<EmergencyContact>>(`${environment.apiBaseUrl}/admin/contacts/${id}`, payload)
      .pipe(map((response) => response.data));
  }
}
