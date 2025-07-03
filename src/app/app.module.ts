import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppointmentBookingComponent } from './components/appointments/appointment-booking/appointment-booking.component';
import { AppointmentManagementComponent } from './components/appointments/appointment-management/appointment-management.component';
import { VaccinationCentersComponent } from './components/vaccination-centers/vaccination-centers/vaccination-centers.component';
import { VaccineStockManagementComponent } from './components/vaccine-stocks/vaccine-stock-management/vaccine-stock-management.component';
import { VaccinationCenterFormComponent } from './components/vaccination-center-form/vaccination-center-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    AppointmentBookingComponent,
    AppointmentManagementComponent,
    VaccinationCentersComponent,
    VaccineStockManagementComponent,
    VaccinationCenterFormComponent  // MOVE BACK TO DECLARATIONS
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,  // REQUIRED for formGroup
    HttpClientModule
    // REMOVE VaccinationCenterFormComponent from here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
