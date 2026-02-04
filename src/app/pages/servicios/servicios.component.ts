import { CommonModule } from '@angular/common';
import { StickyFooterComponent } from '../../components/sticky-footer/sticky-footer.component';
import { Component, inject } from '@angular/core';
import { catchError, of } from 'rxjs';

import { PublicServicesService } from '../../services/public-services.service';
import { RichTextPipe } from '../../pipes/rich-text.pipe';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule, StickyFooterComponent, RichTextPipe],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})
export class ServiciosComponent {
  private readonly publicServicesService = inject(PublicServicesService);

  readonly services$ = this.publicServicesService.getServices().pipe(catchError(() => of([])));
}
