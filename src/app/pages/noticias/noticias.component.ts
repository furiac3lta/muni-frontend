import { CommonModule } from '@angular/common';
import { StickyFooterComponent } from '../../components/sticky-footer/sticky-footer.component';
import { Component, inject } from '@angular/core';
import { catchError, of } from 'rxjs';

import { NewsService } from '../../services/news.service';
import { RichTextPipe } from '../../pipes/rich-text.pipe';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [CommonModule, StickyFooterComponent, RichTextPipe],
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.css'
})
export class NoticiasComponent {
  private readonly newsService = inject(NewsService);

  readonly news$ = this.newsService.getNews().pipe(catchError(() => of([])));
}
