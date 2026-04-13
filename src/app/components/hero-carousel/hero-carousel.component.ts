import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CarouselSlide } from '../../models/carousel-slide';
import { CarouselService } from '../../services/carousel.service';

@Component({
  selector: 'app-hero-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-carousel.component.html',
  styleUrls: ['./hero-carousel.component.scss']
})
export class HeroCarouselComponent implements OnInit, OnDestroy {
  slides: CarouselSlide[] = [];
  activeIndex = 0;
  private intervalId?: number;
  private readonly carouselService = inject(CarouselService);

  ngOnInit(): void {
    this.carouselService.getSlides().subscribe({
      next: (slides) => {
        this.slides = slides.length ? slides : this.fallbackSlides();
      },
      error: () => {
        this.slides = this.fallbackSlides();
      }
    });

    this.intervalId = window.setInterval(() => this.next(), 7000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
    }
  }

  goTo(index: number): void {
    this.activeIndex = index;
  }

  prev(): void {
    if (!this.slides.length) {
      return;
    }
    this.activeIndex = (this.activeIndex - 1 + this.slides.length) % this.slides.length;
  }

  next(): void {
    if (!this.slides.length) {
      return;
    }
    this.activeIndex = (this.activeIndex + 1) % this.slides.length;
  }

  private fallbackSlides(): CarouselSlide[] {
    return [
      {
        id: 0,
        title: 'Gobierno municipal con presencia digital moderna',
        subtitle: 'Transparencia, servicios y noticias en un solo portal pensado para la comunidad.',
        buttonText: 'Explorar servicios',
        imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
        position: 1,
        active: true
      },
      {
        id: 0,
        title: 'Atención ciudadana ágil y accesible',
        subtitle: 'Información clara, contactos directos y actualizaciones oficiales en primer plano.',
        buttonText: 'Ver contactos',
        imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80',
        position: 2,
        active: true
      },
      {
        id: 0,
        title: 'Turismo y cultura local con identidad',
        subtitle: 'Descubre los recorridos, eventos y patrimonio de nuestro municipio con estilo profesional.',
        buttonText: 'Descubrir turismo',
        imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=80',
        position: 3,
        active: true
      }
    ];
  }
}
