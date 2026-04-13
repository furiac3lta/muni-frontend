import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface ServiceItem {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss']
})
export class ServiciosComponent {
  items: ServiceItem[] = [
    {
      icon: 'fa-solid fa-building-columns',
      title: 'Gobierno abierto',
      description: 'Accede a trámites, normativas y atención al ciudadano en un solo lugar.'
    },
    {
      icon: 'fa-solid fa-hand-holding-medical',
      title: 'Salud y bienestar',
      description: 'Información de servicios sanitarios, campañas y turnos disponibles.'
    },
    {
      icon: 'fa-solid fa-droplet',
      title: 'Agua y saneamiento',
      description: 'Reporta cortes, consulta estados y encuentra contactos directos.'
    },
    {
      icon: 'fa-solid fa-tree-city',
      title: 'Espacios públicos',
      description: 'Conoce obras, mantenimiento y espacios culturales de la ciudad.'
    },
    {
      icon: 'fa-solid fa-shield-halved',
      title: 'Seguridad ciudadana',
      description: 'Canales rápidos para emergencias y alertas oficiales en tiempo real.'
    },
    {
      icon: 'fa-solid fa-people-roof',
      title: 'Servicios sociales',
      description: 'Programas, ayudas y recursos para familias y vecinos con atención prioritaria.'
    }
  ];
}
