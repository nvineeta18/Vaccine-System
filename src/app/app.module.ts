import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Import ALL components
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppointmentBookingComponent } from './components/appointments/appointment-booking/appointment-booking.component';
import { AppointmentManagementComponent } from './components/appointments/appointment-management/appointment-management.component';
import { VaccinationCentersComponent } from './components/vaccination-centers/vaccination-centers/vaccination-centers.component';
import { VaccineStockManagementComponent } from './components/vaccine-stocks/vaccine-stock-management/vaccine-stock-management.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    AppointmentBookingComponent,
    AppointmentManagementComponent,
    VaccinationCentersComponent,
    VaccineStockManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
