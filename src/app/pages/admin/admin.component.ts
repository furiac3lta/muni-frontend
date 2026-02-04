import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';

import { AlertItem, AlertType } from '../../models/alert';
import { Business } from '../../models/business';
import { EmergencyContact } from '../../models/contact';
import { MunicipalInfo } from '../../models/municipal-info';
import { NewsItem } from '../../models/news';
import { PublicService } from '../../models/public-service';
import { TouristPlace } from '../../models/tourism';
import { AlertsService } from '../../services/alerts.service';
import { AuthService } from '../../services/auth.service';
import { BusinessService } from '../../services/business.service';
import { ContactsService } from '../../services/contacts.service';
import { MunicipalityService } from '../../services/municipality.service';
import { NewsService } from '../../services/news.service';
import { PublicServicesService } from '../../services/public-services.service';
import { TourismService } from '../../services/tourism.service';
import { UploadService } from '../../services/upload.service';
import { AdminUser, AdminUserRequest, AdminUsersService } from '../../services/admin-users.service';
import { StickyFooterComponent } from '../../components/sticky-footer/sticky-footer.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, StickyFooterComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  section: string = 'municipio';
  navOpen = false;

  municipalInfo: Partial<MunicipalInfo> = {};
  news: NewsItem[] = [];
  alerts: AlertItem[] = [];
  contacts: EmergencyContact[] = [];
  tourism: TouristPlace[] = [];
  businesses: Business[] = [];
  services: PublicService[] = [];
  adminUsers: AdminUser[] = [];

  newsForm: Partial<NewsItem> = { active: true };
  alertForm: Partial<AlertItem> = { type: 'AVISO', active: true };
  contactForm: Partial<EmergencyContact> = { active: true, priority: 0 };
  tourismForm: Partial<TouristPlace> = { active: true, imageUrls: [] };
  businessForm: Partial<Business> = { active: true, highlighted: false };
  serviceForm: Partial<PublicService> = { active: true };
  adminUserForm: AdminUserRequest = { username: '', password: '', role: 'ADMIN', active: true };

  selectedNews?: NewsItem;
  selectedAlert?: AlertItem;
  selectedContact?: EmergencyContact;
  selectedTourism?: TouristPlace;
  selectedBusiness?: Business;
  selectedService?: PublicService;
  selectedAdminUser?: AdminUser;

  uploadBusy = false;
  uploadMessage = '';

  readonly alertTypes: AlertType[] = ['CLIMA', 'CORTE', 'AVISO'];

  constructor(
    private readonly municipalityService: MunicipalityService,
    private readonly newsService: NewsService,
    private readonly alertsService: AlertsService,
    private readonly contactsService: ContactsService,
    private readonly tourismService: TourismService,
    private readonly businessService: BusinessService,
    private readonly publicServicesService: PublicServicesService,
    private readonly adminUsersService: AdminUsersService,
    private readonly uploadService: UploadService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.refreshAll();
  }

  setSection(section: string): void {
    this.section = section;
  }

  toggleNav(): void {
    this.navOpen = !this.navOpen;
  }

  closeNav(): void {
    if (this.navOpen) {
      this.navOpen = false;
    }
  }

  refreshAll(): void {
    this.municipalityService.getInfo().subscribe({
      next: (info) => (this.municipalInfo = info),
      error: () => (this.municipalInfo = {})
    });
    this.newsService.getNews().subscribe((items) => (this.news = items));
    this.alertsService.getAlerts().subscribe((items) => (this.alerts = items));
    this.contactsService.getContacts().subscribe((items) => (this.contacts = items));
    this.tourismService.getPlaces().subscribe((items) => (this.tourism = items));
    this.businessService.getBusinesses().subscribe((items) => (this.businesses = items));
    this.publicServicesService.getServices().subscribe((items) => (this.services = items));
    this.adminUsersService.getUsers().subscribe((items) => (this.adminUsers = items));
  }

  saveMunicipality(): void {
    this.municipalityService.updateInfo(this.municipalInfo).subscribe((info) => {
      this.municipalInfo = info;
      this.refreshAll();
    });
  }

  saveNews(): void {
    if (this.selectedNews) {
      this.newsService.updateNews(this.selectedNews.id, this.newsForm).subscribe(() => {
        this.resetNews();
        this.refreshAll();
      });
    } else {
      this.newsService.createNews(this.newsForm).subscribe(() => {
        this.resetNews();
        this.refreshAll();
      });
    }
  }

  editNews(item: NewsItem): void {
    this.selectedNews = item;
    this.newsForm = { ...item };
  }

  deleteNews(item: NewsItem): void {
    this.newsService.deleteNews(item.id).subscribe(() => {
      this.resetNews();
      this.refreshAll();
    });
  }

  resetNews(): void {
    this.selectedNews = undefined;
    this.newsForm = { active: true };
    this.newsService.getNews().subscribe((items) => (this.news = items));
  }

  saveAlert(): void {
    if (this.selectedAlert) {
      this.alertsService.updateAlert(this.selectedAlert.id, this.alertForm).subscribe(() => {
        this.resetAlerts();
        this.refreshAll();
      });
    } else {
      this.alertsService.createAlert(this.alertForm).subscribe(() => {
        this.resetAlerts();
        this.refreshAll();
      });
    }
  }

  editAlert(item: AlertItem): void {
    this.selectedAlert = item;
    this.alertForm = { ...item };
  }

  resetAlerts(): void {
    this.selectedAlert = undefined;
    this.alertForm = { type: 'AVISO', active: true };
    this.alertsService.getAlerts().subscribe((items) => (this.alerts = items));
  }

  saveContact(): void {
    if (this.selectedContact) {
      this.contactsService
        .updateContact(this.selectedContact.id, this.contactForm)
        .subscribe(() => {
          this.resetContacts();
          this.refreshAll();
        });
    } else {
      this.contactsService.createContact(this.contactForm).subscribe(() => {
        this.resetContacts();
        this.refreshAll();
      });
    }
  }

  editContact(item: EmergencyContact): void {
    this.selectedContact = item;
    this.contactForm = { ...item };
  }

  resetContacts(): void {
    this.selectedContact = undefined;
    this.contactForm = { active: true, priority: 0 };
    this.contactsService.getContacts().subscribe((items) => (this.contacts = items));
  }

  saveTourism(): void {
    if (this.tourismForm.imageUrl && !(this.tourismForm.imageUrls?.length)) {
      this.tourismForm.imageUrls = [this.tourismForm.imageUrl];
    }
    if (!this.tourismForm.imageUrl && this.tourismForm.imageUrls?.length) {
      this.tourismForm.imageUrl = this.tourismForm.imageUrls[0];
    }
    if (this.selectedTourism) {
      this.tourismService
        .updatePlace(this.selectedTourism.id, this.tourismForm)
        .subscribe(() => {
          this.resetTourism();
          this.refreshAll();
        });
    } else {
      this.tourismService.createPlace(this.tourismForm).subscribe(() => {
        this.resetTourism();
        this.refreshAll();
      });
    }
  }

  editTourism(item: TouristPlace): void {
    this.selectedTourism = item;
    this.tourismForm = {
      ...item,
      imageUrls: item.imageUrls?.length ? item.imageUrls : item.imageUrl ? [item.imageUrl] : []
    };
  }

  resetTourism(): void {
    this.selectedTourism = undefined;
    this.tourismForm = { active: true, imageUrls: [] };
    this.tourismService.getPlaces().subscribe((items) => (this.tourism = items));
  }

  saveBusiness(): void {
    if (this.selectedBusiness) {
      this.businessService
        .updateBusiness(this.selectedBusiness.id, this.businessForm)
        .subscribe(() => {
          this.resetBusiness();
          this.refreshAll();
        });
    } else {
      this.businessService.createBusiness(this.businessForm).subscribe(() => {
        this.resetBusiness();
        this.refreshAll();
      });
    }
  }

  editBusiness(item: Business): void {
    this.selectedBusiness = item;
    this.businessForm = { ...item };
  }

  resetBusiness(): void {
    this.selectedBusiness = undefined;
    this.businessForm = { active: true, highlighted: false };
    this.businessService.getBusinesses().subscribe((items) => (this.businesses = items));
  }

  saveService(): void {
    if (this.selectedService) {
      this.publicServicesService
        .updateService(this.selectedService.id, this.serviceForm)
        .subscribe(() => {
          this.resetService();
          this.refreshAll();
        });
    } else {
      this.publicServicesService.createService(this.serviceForm).subscribe(() => {
        this.resetService();
        this.refreshAll();
      });
    }
  }

  editService(item: PublicService): void {
    this.selectedService = item;
    this.serviceForm = { ...item };
  }

  resetService(): void {
    this.selectedService = undefined;
    this.serviceForm = { active: true };
    this.publicServicesService.getServices().subscribe((items) => (this.services = items));
  }

  saveAdminUser(): void {
    if (this.selectedAdminUser) {
      this.adminUsersService
        .updateUser(this.selectedAdminUser.id, this.adminUserForm)
        .subscribe(() => {
          this.resetAdminUsers();
          this.refreshAll();
        });
    } else {
      this.adminUsersService.createUser(this.adminUserForm).subscribe(() => {
        this.resetAdminUsers();
        this.refreshAll();
      });
    }
  }

  editAdminUser(item: AdminUser): void {
    this.selectedAdminUser = item;
    this.adminUserForm = {
      username: item.username,
      role: item.role,
      active: item.active
    };
  }

  resetAdminUsers(): void {
    this.selectedAdminUser = undefined;
    this.adminUserForm = { username: '', password: '', role: 'ADMIN', active: true };
    this.adminUsersService.getUsers().subscribe((items) => (this.adminUsers = items));
  }

  handleTourismImagesUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    if (!files.length) return;
    this.uploadBusy = true;
    this.uploadMessage = '';
    const uploads = files.map((file) => this.uploadService.uploadImage(file));
    forkJoin(uploads).subscribe({
      next: (urls) => {
        this.uploadBusy = false;
        const current = this.tourismForm.imageUrls ?? [];
        this.tourismForm.imageUrls = [...current, ...urls];
        if (!this.tourismForm.imageUrl && this.tourismForm.imageUrls.length) {
          this.tourismForm.imageUrl = this.tourismForm.imageUrls[0];
        }
        this.uploadMessage = 'Imagenes subidas correctamente.';
      },
      error: () => {
        this.uploadBusy = false;
        this.uploadMessage = 'No se pudo subir la imagen.';
      }
    });
  }

  handleNewsImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    this.uploadBusy = true;
    this.uploadMessage = '';
    this.uploadService.uploadImage(file).subscribe({
      next: (url) => {
        this.uploadBusy = false;
        const current = this.newsForm.content?.trim() ?? '';
        const separator = current ? '\n\n' : '';
        this.newsForm.content = `${current}${separator}![Imagen](${url})\n`;
        this.uploadMessage = 'Imagen subida y agregada al contenido.';
      },
      error: () => {
        this.uploadBusy = false;
        this.uploadMessage = 'No se pudo subir la imagen.';
      }
    });
  }

  logout(): void {
    this.authService.logout();
    location.href = '/admin/login';
  }

  get loggedUsername(): string {
    return this.authService.getUsername() || 'admin';
  }

  get loggedRole(): string {
    return this.authService.getRole() || 'ADMIN';
  }
}
