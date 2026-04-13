import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SiteFooterComponent } from '../site-footer/site-footer.component';

@Component({
  selector: 'app-sticky-footer',
  standalone: true,
  imports: [CommonModule, SiteFooterComponent],
  templateUrl: './sticky-footer.component.html',
  styleUrl: './sticky-footer.component.css'
})
export class StickyFooterComponent {}
