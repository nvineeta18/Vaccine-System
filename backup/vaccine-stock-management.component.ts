import { Component, OnInit } from '@angular/core';
import { VaccineStockService } from '../../services/vaccine-stock.service';
import { VaccinationCenterService } from '../../services/vaccination-center.service';
import { VaccineStock } from '../../models/vaccine-stock.model';
import { VaccinationCenter } from '../../models/vaccination-center.model';

@Component({
  selector: 'app-vaccine-stock-management',
  templateUrl: './vaccine-stock-management.component.html',
  styleUrls: ['./vaccine-stock-management.component.css']
})
export class VaccineStockManagementComponent implements OnInit {
  stocks: VaccineStock[] = [];
  centers: VaccinationCenter[] = [];
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
      next: (stocks) => {
        this.stocks = stocks;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading stocks:', error);
        this.loading = false;
      }
    });
  }

  loadCenters(): void {
    this.vaccinationCenterService.getActiveCenters().subscribe({
      next: (centers) => {
        this.centers = centers;
      },
      error: (error) => console.error('Error loading centers:', error)
    });
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.resetForm();
    }
  }

  addOrUpdateStock(): void {
    this.vaccineStockService.addOrUpdateStock(
      this.newStock.centerId,
      this.newStock.vaccineType,
      this.newStock.quantity
    ).subscribe({
      next: () => {
        this.loadStocks();
        this.resetForm();
        alert('Stock updated successfully!');
      },
      error: (error) => {
        alert('Error updating stock: ' + (error.error?.error || 'Unknown error'));
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
        error: (error) => {
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
