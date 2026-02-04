import { CommonModule } from '@angular/common';
import { StickyFooterComponent } from '../../components/sticky-footer/sticky-footer.component';
import { Component, inject } from '@angular/core';
import { catchError, of } from 'rxjs';

import { MunicipalityService } from '../../services/municipality.service';

@Component({
  selector: 'app-municipio-ubicacion',
  standalone: true,
  imports: [CommonModule, StickyFooterComponent],
  templateUrl: './municipio-ubicacion.component.html',
  styleUrl: './municipio-ubicacion.component.css'
})
export class MunicipioUbicacionComponent {
  private readonly municipalityService = inject(MunicipalityService);

  readonly info$ = this.municipalityService.getInfo().pipe(catchError(() => of(null)));
}
