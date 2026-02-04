import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StickyFooterComponent } from '../../components/sticky-footer/sticky-footer.component';

@Component({
  selector: 'app-instalar',
  standalone: true,
  imports: [CommonModule, RouterLink, StickyFooterComponent],
  templateUrl: './instalar.component.html',
  styleUrl: './instalar.component.css'
})
export class InstalarComponent {}
