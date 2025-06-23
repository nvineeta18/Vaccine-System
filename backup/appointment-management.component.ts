import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { Appointment } from '../../models/appointment.model';

@Component({
  selector: 'app-appointment-management',
  templateUrl: './appointment-management.component.html',
  styleUrls: ['./appointment-management.component.css']
})
export class AppointmentManagementComponent implements OnInit {
  appointments: Appointment[] = [];
  filteredAppointments: Appointment[] = [];
  loading = false;
  searchTerm = '';
  statusFilter = '';

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.loading = true;
    this.appointmentService.getAllAppointments().subscribe({
      next: (appointments) => {
        this.appointments = appointments;
        this.filteredAppointments = appointments;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading appointments:', error);
        this.loading = false;
      }
    });
  }

  filterAppointments(): void {
    this.filteredAppointments = this.appointments.filter(appointment => {
      const matchesSearch = !this.searchTerm || 
        appointment.user?.firstName?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        appointment.user?.lastName?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        appointment.vaccinationCenter?.name?.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesStatus = !this.statusFilter || appointment.status === this.statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }

  markAsCompleted(appointmentId: number): void {
    if (confirm('Are you sure you want to mark this appointment as completed?')) {
      this.appointmentService.markAsCompleted(appointmentId).subscribe({
        next: (response) => {
          alert(`Appointment completed! Certificate Number: ${response.certificateNumber}`);
          this.loadAppointments();
        },
        error: (error) => {
          alert('Error completing appointment: ' + (error.error?.error || 'Unknown error'));
        }
      });
    }
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'SCHEDULED': return 'bg-warning';
      case 'COMPLETED': return 'bg-success';
      case 'CANCELLED': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }
}
