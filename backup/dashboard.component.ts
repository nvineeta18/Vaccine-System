import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AppointmentService } from '../../services/appointment.service';
import { VaccinationCenterService } from '../../services/vaccination-center.service';
import { User } from '../../models/user.model';
import { Appointment } from '../../models/appointment.model';
import { VaccinationCenter } from '../../models/vaccination-center.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;
  userAppointments: Appointment[] = [];
  allAppointments: Appointment[] = [];
  vaccinationCenters: VaccinationCenter[] = [];
  loading = false;

  constructor(
    private authService: AuthService,
    private appointmentService: AppointmentService,
    private vaccinationCenterService: VaccinationCenterService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;
    
    if (this.currentUser) {
      if (this.isAdmin()) {
        this.loadAdminData();
      } else {
        this.loadUserData();
      }
    }
  }

  loadUserData(): void {
    if (this.currentUser?.userId) {
      this.appointmentService.getUserAppointments(this.currentUser.userId).subscribe({
        next: (appointments) => {
          this.userAppointments = appointments;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading user appointments:', error);
          this.loading = false;
        }
      });
    }
  }

  loadAdminData(): void {
    // Load all appointments and centers for admin
    this.appointmentService.getAllAppointments().subscribe({
      next: (appointments) => {
        this.allAppointments = appointments;
      },
      error: (error) => console.error('Error loading appointments:', error)
    });

    this.vaccinationCenterService.getAllCenters().subscribe({
      next: (centers) => {
        this.vaccinationCenters = centers;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading centers:', error);
        this.loading = false;
      }
    });
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  logout(): void {
    this.authService.logout();
  }
}
