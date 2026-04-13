import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface ServiceItem {
  icon: string;
  title: string;
  description: string;
  route: string;
}

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss']
})
export class ServiciosComponent {
  items: ServiceItem[] = [
    {
      icon: 'fa-solid fa-screwdriver-wrench',
      title: 'Servicios útiles',
      description: 'Consultá prestaciones, horarios y datos prácticos para resolver trámites y gestiones.',
      route: '/servicios'
    },
    {
      icon: 'fa-regular fa-newspaper',
      title: 'Noticias',
      description: 'Leé comunicados, novedades y publicaciones institucionales del municipio.',
      route: '/noticias'
    },
    {
      icon: 'fa-solid fa-triangle-exclamation',
      title: 'Alertas',
      description: 'Accedé a avisos urgentes, clima y comunicaciones importantes en tiempo real.',
      route: '/alertas'
    },
    {
      icon: 'fa-solid fa-phone-volume',
      title: 'Teléfonos',
      description: 'Encontrá contactos clave y llamá rápido a las áreas y servicios importantes.',
      route: '/telefonos'
    },
    {
      icon: 'fa-solid fa-camera-retro',
      title: 'Turismo',
      description: 'Descubrí lugares para visitar, eventos y puntos de interés de la ciudad.',
      route: '/turismo'
    },
    {
      icon: 'fa-solid fa-store',
      title: 'Comercios',
      description: 'Explorá negocios locales, rubros y vías de contacto para comprar o consultar.',
      route: '/comercios'
    }
  ];
}
