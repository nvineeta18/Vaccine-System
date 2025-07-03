import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../../services/appointment.service';
import { VaccinationCenterService } from '../../../services/vaccination-center.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-appointment-booking',
  standalone: false,
  templateUrl: './appointment-booking.component.html',
  styleUrls: ['./appointment-booking.component.css']
})
export class AppointmentBookingComponent implements OnInit {
  vaccinationCenters: any[] = [];
  currentUser: User | null = null;
  loading = false;
  error = '';
  success = '';  // ADD THIS

  // CHANGE FROM newAppointment to appointmentData
  appointmentData = {
    vaccinationCenterId: 0,
    appointmentDate: '',
    appointmentTime: '',
    vaccineType: ''
  };

  vaccineTypes = ['Covishield', 'Covaxin', 'Sputnik V', 'Pfizer', 'Moderna'];
  
  // ADD THIS
  timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30'
  ];

  constructor(
    private appointmentService: AppointmentService,
    private vaccinationCenterService: VaccinationCenterService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadVaccinationCenters();
  }

  loadVaccinationCenters(): void {
    console.log('Loading vaccination centers...');
    this.vaccinationCenterService.getActiveCenters().subscribe({
      next: (centers: any) => {
        this.vaccinationCenters = centers;
        console.log('Loaded centers:', centers);
        if (centers.length === 0) {
          this.error = 'No vaccination centers available. Please contact admin.';
        }
      },
      error: (error: any) => {
        console.error('Error loading centers:', error);
        if (error.status === 403) {
          this.error = 'Access denied to vaccination centers. Please check permissions.';
        } else if (error.status === 404) {
          this.error = 'Vaccination centers service not found.';
        } else if (error.status === 0) {
          this.error = 'Cannot connect to server. Please check if backend is running on port 8080.';
        } else {
          this.error = 'Failed to load vaccination centers. Please try again later.';
        }
      }
    });
  }

  // ADD THIS METHOD
  getMinDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  onSubmit(): void {
    // Validation
    if (!this.appointmentData.vaccinationCenterId || this.appointmentData.vaccinationCenterId === 0) {
      this.error = 'Please select a vaccination center';
      return;
    }

    if (!this.appointmentData.vaccineType) {
      this.error = 'Please select a vaccine type';
      return;
    }

    if (!this.appointmentData.appointmentDate) {
      this.error = 'Please select an appointment date';
      return;
    }

    if (!this.appointmentData.appointmentTime) {
      this.error = 'Please select an appointment time';
      return;
    }

    // Clear previous messages
    this.error = '';
    this.success = '';

    console.log('Booking appointment:', this.appointmentData);

    // Create appointment object for backend
    const appointmentRequest = {
      vaccinationCenterId: this.appointmentData.vaccinationCenterId,
      appointmentDate: this.appointmentData.appointmentDate,
      appointmentTime: this.appointmentData.appointmentTime,
      vaccineType: this.appointmentData.vaccineType
    };

    this.appointmentService.bookAppointment(appointmentRequest).subscribe({
      next: (response: any) => {
        console.log('Appointment booked successfully:', response);
        this.success = 'Appointment booked successfully! You will receive a confirmation shortly.';
        this.resetForm();
      },
      error: (error: any) => {
        console.error('Error booking appointment:', error);
        this.error = 'Error booking appointment: ' + (error.error?.error || error.message || 'Unknown error');
      }
    });
  }

  resetForm(): void {
    this.appointmentData = {
      vaccinationCenterId: 0,
      appointmentDate: '',
      appointmentTime: '',
      vaccineType: ''
    };
  }
}
