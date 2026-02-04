import { CommonModule } from '@angular/common';
import { StickyFooterComponent } from '../../components/sticky-footer/sticky-footer.component';
import { Component, inject } from '@angular/core';
import { catchError, of } from 'rxjs';

import { MunicipalityService } from '../../services/municipality.service';

@Component({
  selector: 'app-municipio-horarios',
  standalone: true,
  imports: [CommonModule, StickyFooterComponent],
  templateUrl: './municipio-horarios.component.html',
  styleUrl: './municipio-horarios.component.css'
})
export class MunicipioHorariosComponent {
  private readonly municipalityService = inject(MunicipalityService);

  readonly info$ = this.municipalityService.getInfo().pipe(catchError(() => of(null)));
}
