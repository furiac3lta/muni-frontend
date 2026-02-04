import { Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { AdminComponent } from './pages/admin/admin.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AlertasComponent } from './pages/alertas/alertas.component';
import { ComerciosComponent } from './pages/comercios/comercios.component';
import { MunicipioHistoriaComponent } from './pages/municipio-historia/municipio-historia.component';
import { MunicipioHorariosComponent } from './pages/municipio-horarios/municipio-horarios.component';
import { MunicipioUbicacionComponent } from './pages/municipio-ubicacion/municipio-ubicacion.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { TelefonosComponent } from './pages/telefonos/telefonos.component';
import { TurismoComponent } from './pages/turismo/turismo.component';
import { InstalarComponent } from './pages/instalar/instalar.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'municipio/historia', component: MunicipioHistoriaComponent },
  { path: 'municipio/ubicacion', component: MunicipioUbicacionComponent },
  { path: 'municipio/horarios', component: MunicipioHorariosComponent },
  { path: 'noticias', component: NoticiasComponent },
  { path: 'alertas', component: AlertasComponent },
  { path: 'telefonos', component: TelefonosComponent },
  { path: 'turismo', component: TurismoComponent },
  { path: 'comercios', component: ComerciosComponent },
  { path: 'servicios', component: ServiciosComponent },
  { path: 'instalar', component: InstalarComponent },
  { path: 'admin/login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: '**', redirectTo: '' }
];
