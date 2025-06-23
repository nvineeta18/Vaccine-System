import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { VaccinationCenterService } from '../../services/vaccination-center.service';
import { AuthService } from '../../services/auth.service';
import { AppointmentRequest } from '../../models/appointment.model';
import { VaccinationCenter } from '../../models/vaccination-center.model';

@Component({
  selector: 'app-appointment-booking',
  templateUrl: './appointment-booking.component.html',
  styleUrls: ['./appointment-booking.component.css']
})
export class AppointmentBookingComponent implements OnInit {
  appointmentData: AppointmentRequest = {
    userId: 0,
    vaccinationCenterId: 0,
    appointmentDate: '',
    appointmentTime: '',
    vaccineType: ''
  };

  vaccinationCenters: VaccinationCenter[] = [];
  vaccineTypes = ['Covishield', 'Covaxin', 'Sputnik V', 'Pfizer', 'Moderna'];
  timeSlots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];
  
  loading = false;
  error = '';
  success = '';

  constructor(
    private appointmentService: AppointmentService,
    private vaccinationCenterService: VaccinationCenterService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser?.userId) {
      this.appointmentData.userId = currentUser.userId;
    }
    this.loadVaccinationCenters();
  }

  loadVaccinationCenters(): void {
    this.vaccinationCenterService.getActiveCenters().subscribe({
      next: (centers) => {
        this.vaccinationCenters = centers;
      },
      error: (error) => {
        console.error('Error loading centers:', error);
      }
    });
  }

  onSubmit(): void {
    this.loading = true;
    this.error = '';
    this.success = '';

    this.appointmentService.bookAppointment(this.appointmentData).subscribe({
      next: (response) => {
        this.loading = false;
        this.success = 'Appointment booked successfully!';
        this.resetForm();
      },
      error: (error) => {
        this.loading = false;
        this.error = error.error?.error || 'Failed to book appointment';
      }
    });
  }

  resetForm(): void {
    const currentUserId = this.appointmentData.userId;
    this.appointmentData = {
      userId: currentUserId,
      vaccinationCenterId: 0,
      appointmentDate: '',
      appointmentTime: '',
      vaccineType: ''
    };
  }

  getMinDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }
}
