import { CommonModule } from '@angular/common';
import { StickyFooterComponent } from '../../components/sticky-footer/sticky-footer.component';
import { Component, inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

import { AlertsService } from '../../services/alerts.service';
import { RichTextPipe } from '../../pipes/rich-text.pipe';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-alertas',
  standalone: true,
  imports: [CommonModule, StickyFooterComponent, RichTextPipe],
  templateUrl: './alertas.component.html',
  styleUrl: './alertas.component.css'
})
export class AlertasComponent {
  private readonly alertsService = inject(AlertsService);
  readonly weatherService = inject(WeatherService);

  readonly alerts$ = this.alertsService.getAlerts().pipe(catchError(() => of([])));
  readonly climaAlerts$ = this.alerts$.pipe(map((items) => items.filter((item) => item.type === 'CLIMA')));
  readonly otherAlerts$ = this.alerts$.pipe(map((items) => items.filter((item) => item.type !== 'CLIMA')));
  readonly weather$ = this.weatherService.getWeather().pipe(catchError(() => of(null)));
}
