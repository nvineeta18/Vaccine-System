import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;  // KEEP THIS AS IS
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['/login']);
    }
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Navigation methods
  onBookAppointment(): void {
    console.log('Navigating to booking screen...');
    this.router.navigate(['/book-appointment']);
  }

  onViewCenters(): void {
    console.log('Navigating to vaccination centers...');
    this.router.navigate(['/vaccination-centers']);
  }

  onManageAppointments(): void {
    console.log('Navigating to appointment management...');
    this.router.navigate(['/manage-appointments']);
  }

  onManageStocks(): void {
    console.log('Navigating to vaccine stock management...');
    this.router.navigate(['/vaccine-stocks']);
  }
}
