import { Component, OnInit } from '@angular/core';
import { VaccinationCenterService } from '../../services/vaccination-center.service';
import { AuthService } from '../../services/auth.service';
import { VaccinationCenter } from '../../models/vaccination-center.model';

@Component({
  selector: 'app-vaccination-centers',
  templateUrl: './vaccination-centers.component.html',
  styleUrls: ['./vaccination-centers.component.css']
})
export class VaccinationCentersComponent implements OnInit {
  centers: VaccinationCenter[] = [];
  filteredCenters: VaccinationCenter[] = [];
  loading = false;
  searchCity = '';
  searchPincode = '';
  showAddForm = false;
  editingCenter: VaccinationCenter | null = null;

  newCenter: VaccinationCenter = {
    name: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phoneNumber: '',
    openingTime: '09:00',
    closingTime: '17:00',
    dailyCapacity: 100,
    status: 'ACTIVE'
  };

  constructor(
    private vaccinationCenterService: VaccinationCenterService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadCenters();
  }

  loadCenters(): void {
    this.loading = true;
    this.vaccinationCenterService.getAllCenters().subscribe({
      next: (centers) => {
        this.centers = centers;
        this.filteredCenters = centers;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading centers:', error);
        this.loading = false;
      }
    });
  }

  searchByCity(): void {
    if (this.searchCity.trim()) {
      this.vaccinationCenterService.searchByCity(this.searchCity).subscribe({
        next: (centers) => {
          this.filteredCenters = centers;
        },
        error: (error) => console.error('Error searching by city:', error)
      });
    } else {
      this.filteredCenters = this.centers;
    }
  }

  searchByPincode(): void {
    if (this.searchPincode.trim()) {
      this.vaccinationCenterService.searchByPincode(this.searchPincode).subscribe({
        next: (centers) => {
          this.filteredCenters = centers;
        },
        error: (error) => console.error('Error searching by pincode:', error)
      });
    } else {
      this.filteredCenters = this.centers;
    }
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.resetForm();
    }
  }

  editCenter(center: VaccinationCenter): void {
    this.editingCenter = { ...center };
    this.showAddForm = true;
    this.newCenter = { ...center };
  }

  saveCenter(): void {
    if (this.editingCenter) {
      // Update existing center
      this.vaccinationCenterService.updateCenter(this.editingCenter.id!, this.newCenter).subscribe({
        next: () => {
          this.loadCenters();
          this.resetForm();
          alert('Center updated successfully!');
        },
        error: (error) => {
          alert('Error updating center: ' + (error.error?.error || 'Unknown error'));
        }
      });
    } else {
      // Create new center
      this.vaccinationCenterService.createCenter(this.newCenter).subscribe({
        next: () => {
          this.loadCenters();
          this.resetForm();
          alert('Center created successfully!');
        },
        error: (error) => {
          alert('Error creating center: ' + (error.error?.error || 'Unknown error'));
        }
      });
    }
  }

  deleteCenter(id: number): void {
    if (confirm('Are you sure you want to delete this center?')) {
      this.vaccinationCenterService.deleteCenter(id).subscribe({
        next: () => {
          this.loadCenters();
          alert('Center deleted successfully!');
        },
        error: (error) => {
          alert('Error deleting center: ' + (error.error?.error || 'Unknown error'));
        }
      });
    }
  }

  toggleCenterStatus(center: VaccinationCenter): void {
    const action = center.status === 'ACTIVE' ? 'disable' : 'enable';
    const service = center.status === 'ACTIVE' 
      ? this.vaccinationCenterService.disableCenter(center.id!)
      : this.vaccinationCenterService.enableCenter(center.id!);

    service.subscribe({
      next: () => {
        this.loadCenters();
        alert(`Center ${action}d successfully!`);
      },
      error: (error) => {
        alert(`Error ${action}ing center: ` + (error.error?.error || 'Unknown error'));
      }
    });
  }

  resetForm(): void {
    this.newCenter = {
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      phoneNumber: '',
      openingTime: '09:00',
      closingTime: '17:00',
      dailyCapacity: 100,
      status: 'ACTIVE'
    };
    this.showAddForm = false;
    this.editingCenter = null;
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'ACTIVE': return 'bg-success';
      case 'INACTIVE': return 'bg-warning';
      case 'DISABLED': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }
}
