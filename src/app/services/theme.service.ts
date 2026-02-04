import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ThemeMode = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'theme';
  private readonly themeSubject = new BehaviorSubject<ThemeMode>('light');
  readonly theme$ = this.themeSubject.asObservable();

  initTheme(): void {
    const stored = localStorage.getItem(this.storageKey) as ThemeMode | null;
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    const theme = stored ?? (prefersDark ? 'dark' : 'light');
    this.setTheme(theme, false);
  }

  setTheme(theme: ThemeMode, persist = true): void {
    document.documentElement.setAttribute('data-theme', theme);
    this.themeSubject.next(theme);
    if (persist) {
      localStorage.setItem(this.storageKey, theme);
    }
  }

  toggleTheme(): void {
    const next = this.themeSubject.value === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
  }

  get currentTheme(): ThemeMode {
    return this.themeSubject.value;
  }
}
