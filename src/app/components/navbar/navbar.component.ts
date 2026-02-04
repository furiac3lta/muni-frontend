import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ClockComponent } from '../clock/clock.component';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, ClockComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  navOpen = false;
  private readonly themeService = inject(ThemeService);

  toggleNav(): void {
    this.navOpen = !this.navOpen;
  }

  closeNav(): void {
    if (this.navOpen) {
      this.navOpen = false;
    }
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  get isDark(): boolean {
    return this.themeService.currentTheme === 'dark';
  }
}
