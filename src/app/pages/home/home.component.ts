import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PlainTextPipe } from '../../pipes/plain-text.pipe';
import { StickyFooterComponent } from '../../components/sticky-footer/sticky-footer.component';
import { WeatherService } from '../../services/weather.service';
import { Component, inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

import { AlertsService } from '../../services/alerts.service';
import { BusinessService } from '../../services/business.service';
import { ContactsService } from '../../services/contacts.service';
import { MunicipalityService } from '../../services/municipality.service';
import { NewsService } from '../../services/news.service';
import { PublicServicesService } from '../../services/public-services.service';
import { TourismService } from '../../services/tourism.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, PlainTextPipe, StickyFooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private readonly municipalityService = inject(MunicipalityService);
  private readonly newsService = inject(NewsService);
  private readonly alertsService = inject(AlertsService);
  private readonly contactsService = inject(ContactsService);
  private readonly tourismService = inject(TourismService);
  private readonly businessService = inject(BusinessService);
  private readonly publicServicesService = inject(PublicServicesService);
  readonly weatherService = inject(WeatherService);

  readonly municipalInfo$ = this.municipalityService.getInfo().pipe(catchError(() => of(null)));
  readonly news$ = this.newsService.getNews().pipe(catchError(() => of([])));
  readonly alerts$ = this.alertsService.getAlerts().pipe(catchError(() => of([])));
  readonly climaAlerts$ = this.alerts$.pipe(
    map((items) => items.filter((item) => item.type === 'CLIMA'))
  );
  readonly contacts$ = this.contactsService.getContacts().pipe(catchError(() => of([])));
  readonly tourism$ = this.tourismService.getPlaces().pipe(catchError(() => of([])));
  readonly businesses$ = this.businessService.getBusinesses().pipe(catchError(() => of([])));
  readonly businessesByCategory$ = this.businesses$.pipe(
    map((items) => {
      const grouped = new Map<string, typeof items>();
      items.forEach((item) => {
        const key = item.category || 'Otros';
        const list = grouped.get(key) ?? [];
        list.push(item);
        grouped.set(key, list);
      });
      return Array.from(grouped.entries()).map(([category, list]) => ({ category, list }));
    })
  );
  readonly services$ = this.publicServicesService.getServices().pipe(catchError(() => of([])));
  readonly weather$ = this.weatherService.getWeather().pipe(catchError(() => of(null)));

}
