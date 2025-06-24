import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from '../../../services/appointment.service';
import { VaccinationCenterService } from '../../../services/vaccination-center.service';
import { AuthService } from '../../../services/auth.service';
import { AppointmentRequest } from '../../../models/appointment.model';
import { VaccinationCenter } from '../../../models/vaccination-center.model';

@Component({
  selector: 'app-appointment-booking',
  standalone: false,
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
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser?.userId) {
      this.appointmentData.userId = currentUser.userId;
    } else if (currentUser?.id) {
      // Try using id if userId is not available
      this.appointmentData.userId = currentUser.id;
    }
    
    console.log('Current user ID:', this.appointmentData.userId);
    this.loadVaccinationCenters();
  }

  loadVaccinationCenters(): void {
    this.vaccinationCenterService.getActiveCenters().subscribe({
      next: (centers: any) => {
        this.vaccinationCenters = centers;
        console.log('Loaded centers:', centers);
      },
      error: (error: any) => {
        console.error('Error loading centers:', error);
        this.error = 'Failed to load vaccination centers';
      }
    });
  }

  onSubmit(): void {
    if (!this.appointmentData.userId) {
      this.error = 'User not found. Please login again.';
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    console.log('Submitting appointment:', this.appointmentData);

    this.appointmentService.bookAppointment(this.appointmentData).subscribe({
      next: (response: any) => {
        this.loading = false;
        this.success = 'Appointment booked successfully!';
        console.log('Appointment booked:', response);
        
        // Navigate back to dashboard after 2 seconds
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 2000);
      },
      error: (error: any) => {
        this.loading = false;
        this.error = error.error?.error || 'Failed to book appointment';
        console.error('Booking error:', error);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
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
