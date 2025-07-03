import { Component, OnInit } from '@angular/core';
import { VaccinationCenterService } from '../../../services/vaccination-center.service';
import { VaccinationCenter } from '../../../models/vaccination-center.model';

@Component({
  selector: 'app-vaccination-centers',
  standalone: false,
  templateUrl: './vaccination-centers.component.html',
  styleUrls: ['./vaccination-centers.component.css']
})
export class VaccinationCentersComponent implements OnInit {
  centers: VaccinationCenter[] = [];
  loading = false;
  
  // ADD THESE PROPERTIES FOR THE FORM
  showAddForm = false;
  editingCenter: VaccinationCenter | null = null;

  constructor(
    private vaccinationCenterService: VaccinationCenterService
  ) {}

  ngOnInit(): void {
    this.loadCenters();
  }

  loadCenters(): void {
    this.loading = true;
    this.vaccinationCenterService.getAllCenters().subscribe({
      next: (centers: VaccinationCenter[]) => {
        this.centers = centers;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error loading centers:', error);
        this.loading = false;
      }
    });
  }

  // ADD THESE METHODS FOR FORM HANDLING
  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.editingCenter = null;
    }
  }

  editCenter(center: VaccinationCenter): void {
    this.editingCenter = { ...center }; // Create a copy
    this.showAddForm = true;
  }

  // THIS IS THE "Usage in Parent Component" CODE
  onCenterSaved(center: VaccinationCenter): void {
    console.log('📝 Center data received:', center);
    
    if (center.id) {
      // Update existing center
      this.vaccinationCenterService.updateCenter(center.id, center).subscribe({
        next: (response) => {
          console.log('✅ Center updated successfully');
          this.loadCenters();
          this.showAddForm = false;
          this.editingCenter = null;
          alert('Center updated successfully!');
        },
        error: (error) => {
          console.error('❌ Error updating center:', error);
          alert('Error updating center: ' + (error.error?.error || 'Unknown error'));
        }
      });
    } else {
      // Create new center
      this.vaccinationCenterService.createCenter(center).subscribe({
        next: (response) => {
          console.log('✅ Center created successfully');
          this.loadCenters();
          this.showAddForm = false;
          alert('Center created successfully!');
        },
        error: (error) => {
          console.error('❌ Error creating center:', error);
          alert('Error creating center: ' + (error.error?.error || 'Unknown error'));
        }
      });
    }
  }

  onFormCancelled(): void {
    this.showAddForm = false;
    this.editingCenter = null;
  }

  deleteCenter(centerId: number): void {
    if (confirm('Are you sure you want to delete this center?')) {
      this.vaccinationCenterService.deleteCenter(centerId).subscribe({
        next: () => {
          this.loadCenters();
          alert('Center deleted successfully!');
        },
        error: (error: any) => {
          alert('Error deleting center: ' + (error.error?.error || 'Unknown error'));
        }
      });
    }
  }

  isAdmin(): boolean {
    return true; // For now, assuming admin access
  }
}
