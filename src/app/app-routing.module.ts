import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppointmentBookingComponent } from './components/appointments/appointment-booking/appointment-booking.component';
import { AppointmentManagementComponent } from './components/appointments/appointment-management/appointment-management.component';
import { VaccinationCentersComponent } from './components/vaccination-centers/vaccination-centers/vaccination-centers.component';
import { VaccineStockManagementComponent } from './components/vaccine-stocks/vaccine-stock-management/vaccine-stock-management.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'book-appointment', component: AppointmentBookingComponent },
  { path: 'vaccination-centers', component: VaccinationCentersComponent },
  { path: 'manage-appointments', component: AppointmentManagementComponent },
  { path: 'vaccine-stocks', component: VaccineStockManagementComponent },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
