import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { WeatherResponse } from '../models/weather';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://api.open-meteo.com/v1/forecast';
  private readonly latitude = -26.8;
  private readonly longitude = -55.0167;
  private readonly timezone = 'America/Argentina/Buenos_Aires';

  getWeather(): Observable<WeatherResponse> {
    const url = `${this.baseUrl}?latitude=${this.latitude}&longitude=${this.longitude}` +
      `&current_weather=true&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode` +
      `&timezone=${encodeURIComponent(this.timezone)}`;
    return this.http.get<WeatherResponse>(url);
  }

  mapWeatherCode(code: number): string {
    if (code === 0) return 'Despejado';
    if ([1, 2, 3].includes(code)) return 'Parcialmente nublado';
    if ([45, 48].includes(code)) return 'Niebla';
    if ([51, 53, 55, 56, 57].includes(code)) return 'Llovizna';
    if ([61, 63, 65, 66, 67].includes(code)) return 'Lluvia';
    if ([71, 73, 75, 77].includes(code)) return 'Nieve';
    if ([80, 81, 82].includes(code)) return 'Chubascos';
    if ([95, 96, 99].includes(code)) return 'Tormenta';
    return 'Condicion variable';
  }

  mapWeatherIcon(code: number): string {
    if (code === 0) return 'fa-solid fa-sun';
    if ([1, 2, 3].includes(code)) return 'fa-solid fa-cloud-sun';
    if ([45, 48].includes(code)) return 'fa-solid fa-smog';
    if ([51, 53, 55, 56, 57].includes(code)) return 'fa-solid fa-cloud-rain';
    if ([61, 63, 65, 66, 67].includes(code)) return 'fa-solid fa-cloud-showers-heavy';
    if ([71, 73, 75, 77].includes(code)) return 'fa-solid fa-snowflake';
    if ([80, 81, 82].includes(code)) return 'fa-solid fa-cloud-sun-rain';
    if ([95, 96, 99].includes(code)) return 'fa-solid fa-bolt';
    return 'fa-solid fa-cloud';
  }

  mapWeatherColor(code: number): string {
    if (code === 0) return 'weather-clear';
    if ([1, 2, 3].includes(code)) return 'weather-cloudy';
    if ([45, 48].includes(code)) return 'weather-mist';
    if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
      return 'weather-rain';
    }
    if ([71, 73, 75, 77].includes(code)) return 'weather-snow';
    if ([95, 96, 99].includes(code)) return 'weather-storm';
    return 'weather-cloudy';
  }

  todaySummary(weather: WeatherResponse): { max: number; min: number; rain: number } {
    const max = weather.daily.temperature_2m_max?.[0] ?? 0;
    const min = weather.daily.temperature_2m_min?.[0] ?? 0;
    const rain = weather.daily.precipitation_sum?.[0] ?? 0;
    return { max, min, rain };
  }

  dailyForecast(weather: WeatherResponse): Array<{ label: string; max: number; min: number; rain: number; icon: string; color: string }> {
    const dates = weather.daily.time ?? [];
    return dates.slice(0, 7).map((date, index) => {
      const code = weather.daily.weathercode?.[index] ?? weather.current_weather.weathercode;
      return {
        label: this.formatDate(date),
        max: weather.daily.temperature_2m_max?.[index] ?? 0,
        min: weather.daily.temperature_2m_min?.[index] ?? 0,
        rain: weather.daily.precipitation_sum?.[index] ?? 0,
        icon: this.mapWeatherIcon(code),
        color: this.mapWeatherColor(code),
      };
    });
  }

  private formatDate(value: string): string {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString('es-AR', {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit',
    });
  }
}
