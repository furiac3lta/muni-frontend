import { CommonModule } from '@angular/common';
import { StickyFooterComponent } from '../../components/sticky-footer/sticky-footer.component';
import { Component, inject } from '@angular/core';
import { catchError, of } from 'rxjs';

import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'app-telefonos',
  standalone: true,
  imports: [CommonModule, StickyFooterComponent],
  templateUrl: './telefonos.component.html',
  styleUrl: './telefonos.component.css'
})
export class TelefonosComponent {
  private readonly contactsService = inject(ContactsService);

  readonly contacts$ = this.contactsService.getContacts().pipe(catchError(() => of([])));
}
