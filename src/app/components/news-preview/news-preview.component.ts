import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface NewsCard {
  category: string;
  title: string;
  excerpt: string;
  date: string;
}

@Component({
  selector: 'app-news-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-preview.component.html',
  styleUrls: ['./news-preview.component.scss']
})
export class NewsPreviewComponent {
  articles: NewsCard[] = [
    {
      category: 'Noticias',
      title: 'Nuevos servicios en línea para trámites municipales',
      excerpt: 'Accede al registro digital y gestiona documentos oficiales desde cualquier dispositivo.',
      date: '12 de abril, 2026'
    },
    {
      category: 'Avisos',
      title: 'Campaña de mantenimiento urbano en vías principales',
      excerpt: 'Conocer los cortes programados y las rutas alternativas será clave para la semana.',
      date: '10 de abril, 2026'
    },
    {
      category: 'Eventos',
      title: 'Feria cultural y turística en el centro histórico',
      excerpt: 'Actividades abiertas para todas las edades, con recorrido y guías comunitarios.',
      date: '8 de abril, 2026'
    }
  ];
}
