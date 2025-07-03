import { Component, OnInit } from '@angular/core';
import { VaccineStockService } from '../../../services/vaccine-stock.service';
import { VaccinationCenterService } from '../../../services/vaccination-center.service';
import { VaccineStock } from '../../../models/vaccine-stock.model';

@Component({
  selector: 'app-vaccine-stock-management',
  standalone: false,
  templateUrl: './vaccine-stock-management.component.html',
  styleUrls: ['./vaccine-stock-management.component.css']
})
export class VaccineStockManagementComponent implements OnInit {
  stocks: VaccineStock[] = [];
  centers: any[] = [];
  loading = false;
  showAddForm = false;
  
  newStock = {
    centerId: 0,
    vaccineType: '',
    quantity: 0
  };

  vaccineTypes = ['Covishield', 'Covaxin', 'Sputnik V', 'Pfizer', 'Moderna'];

  constructor(
    private vaccineStockService: VaccineStockService,
    private vaccinationCenterService: VaccinationCenterService
  ) {}

  ngOnInit(): void {
    this.loadStocks();
    this.loadCenters();
  }

  loadStocks(): void {
    this.loading = true;
    this.vaccineStockService.getAllStocks().subscribe({
     next: (stocks: any) => {
        this.stocks = stocks;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error loading stocks:', error);
        this.loading = false;
      }
    });
  }

  loadCenters(): void {
    this.vaccinationCenterService.getActiveCenters().subscribe({
     next: (centers: any) => {
        this.centers = centers;
      },
      error: (error :any) => console.error('Error loading centers:', error)
    });
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.resetForm();
    }
  }

  addOrUpdateStock(): void {
    // Validation
    if (!this.newStock.centerId || this.newStock.centerId === 0) {
      alert('Please select a vaccination center');
      return;
    }
    
    if (!this.newStock.vaccineType || this.newStock.vaccineType.trim() === '') {
      alert('Please select a vaccine type');
      return;
    }
    
    if (this.newStock.quantity < 0) {
      alert('Quantity cannot be negative');
      return;
    }

    console.log('📤 Sending stock data:', this.newStock);

    this.vaccineStockService.addOrUpdateStock(
      this.newStock.centerId,
      this.newStock.vaccineType,
      this.newStock.quantity
    ).subscribe({
      next: (response: any) => {
        console.log('✅ Success response:', response);
        
        if (response.success) {
          this.loadStocks();
          this.resetForm();
          alert('Stock updated successfully!');
        } else {
          alert('Error: ' + (response.error || 'Unknown error'));
        }
      },
      error: (error: any) => {
        console.error('❌ Error response:', error);
        
        let errorMessage = 'Unknown error occurred';
        
        if (error.error && typeof error.error === 'string') {
          errorMessage = error.error;
        } else if (error.error && error.error.error) {
          errorMessage = error.error.error;
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        alert('Error updating stock: ' + errorMessage);
      }
    });
  }

  deleteStock(stockId: number): void {
    if (confirm('Are you sure you want to delete this stock?')) {
      this.vaccineStockService.deleteStock(stockId).subscribe({
        next: () => {
          this.loadStocks();
          alert('Stock deleted successfully!');
        },
        error: (error: any) => {
          alert('Error deleting stock: ' + (error.error?.error || 'Unknown error'));
        }
      });
    }
  }

  resetForm(): void {
    this.newStock = {
      centerId: 0,
      vaccineType: '',
      quantity: 0
    };
    this.showAddForm = false;
  }

  getStockStatusClass(quantity: number): string {
    if (quantity === 0) return 'table-danger';
    if (quantity < 50) return 'table-warning';
    return 'table-success';
  }
}
