import { CommonModule } from '@angular/common';
import { StickyFooterComponent } from '../../components/sticky-footer/sticky-footer.component';
import { Component, inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

import { BusinessService } from '../../services/business.service';

@Component({
  selector: 'app-comercios',
  standalone: true,
  imports: [CommonModule, StickyFooterComponent],
  templateUrl: './comercios.component.html',
  styleUrl: './comercios.component.css'
})
export class ComerciosComponent {
  private readonly businessService = inject(BusinessService);

  readonly businesses$ = this.businessService.getBusinesses().pipe(catchError(() => of([])));
  readonly grouped$ = this.businesses$.pipe(
    map((items) => {
      const grouped = new Map<string, typeof items>();
      items.forEach((item) => {
        const key = item.category || 'Otros';
        const list = grouped.get(key) ?? [];
        list.push(item);
        grouped.set(key, list);
      });
      return Array.from(grouped.entries()).map(([category, list]) => ({ category, list }));
    })
  );
}
