import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeroCarouselComponent } from '../../components/hero-carousel/hero-carousel.component';
import { NewsPreviewComponent } from '../../components/news-preview/news-preview.component';
import { ServiciosComponent } from '../../components/servicios/servicios.component';
import { SiteFooterComponent } from '../../components/site-footer/site-footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeroCarouselComponent, ServiciosComponent, NewsPreviewComponent, SiteFooterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {}
