import { CommonModule } from '@angular/common';
import { StickyFooterComponent } from '../../components/sticky-footer/sticky-footer.component';
import { Component, inject } from '@angular/core';
import { catchError, of } from 'rxjs';

import { TourismService } from '../../services/tourism.service';
import { RichTextPipe } from '../../pipes/rich-text.pipe';

@Component({
  selector: 'app-turismo',
  standalone: true,
  imports: [CommonModule, StickyFooterComponent, RichTextPipe],
  templateUrl: './turismo.component.html',
  styleUrl: './turismo.component.css'
})
export class TurismoComponent {
  private readonly tourismService = inject(TourismService);

  readonly places$ = this.tourismService.getPlaces().pipe(catchError(() => of([])));

  scrollCarousel(track: HTMLElement, direction: number): void {
    track.scrollBy({ left: direction * track.clientWidth, behavior: 'smooth' });
  }
}
