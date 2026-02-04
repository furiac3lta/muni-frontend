import { CommonModule } from '@angular/common';
import { StickyFooterComponent } from '../../components/sticky-footer/sticky-footer.component';
import { Component, inject } from '@angular/core';
import { catchError, of } from 'rxjs';

import { MunicipalityService } from '../../services/municipality.service';
import { RichTextPipe } from '../../pipes/rich-text.pipe';

@Component({
  selector: 'app-municipio-historia',
  standalone: true,
  imports: [CommonModule, StickyFooterComponent, RichTextPipe],
  templateUrl: './municipio-historia.component.html',
  styleUrl: './municipio-historia.component.css'
})
export class MunicipioHistoriaComponent {
  private readonly municipalityService = inject(MunicipalityService);

  readonly info$ = this.municipalityService.getInfo().pipe(catchError(() => of(null)));
}
