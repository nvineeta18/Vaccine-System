import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { VaccinationCenter, CenterStatus } from '../../models/vaccination-center.model';

@Component({
  selector: 'app-vaccination-center-form',
  standalone: false,// ADD THIS
  templateUrl: './vaccination-center-form.component.html',
  styleUrls: ['./vaccination-center-form.component.css']
})
export class VaccinationCenterFormComponent implements OnInit {
  @Input() editingCenter: VaccinationCenter | null = null;
  @Output() centerSaved = new EventEmitter<VaccinationCenter>();
  @Output() formCancelled = new EventEmitter<void>();

  vaccinationCenterForm: FormGroup;
  centerStatusOptions = Object.values(CenterStatus);
  isEditMode = false;

  constructor(private formBuilder: FormBuilder) {
    this.vaccinationCenterForm = this.createForm();
  }

  ngOnInit(): void {
    if (this.editingCenter) {
      this.isEditMode = true;
      this.populateForm(this.editingCenter);
    }
  }

  ngOnChanges(): void {
    if (this.editingCenter) {
      this.isEditMode = true;
      this.populateForm(this.editingCenter);
    } else {
      this.isEditMode = false;
      this.vaccinationCenterForm.reset();
      this.setDefaultValues();
    }
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      id: new FormControl(null),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),
      address: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200)
      ]),
      city: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      state: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      pincode: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{6}$/)  // 6 digit pincode
      ]),
      phoneNumber: new FormControl('', [
        Validators.pattern(/^\d{10}$/)  // 10 digit phone number (optional)
      ]),
      openingTime: new FormControl('08:30', [
        Validators.required
      ]),
      closingTime: new FormControl('16:30', [
        Validators.required
      ]),
      dailyCapacity: new FormControl(100, [
        Validators.required,
        Validators.min(1),
        Validators.max(1000)
      ]),
      status: new FormControl(CenterStatus.ACTIVE, [
        Validators.required
      ])
    });
  }

  private setDefaultValues(): void {
    this.vaccinationCenterForm.patchValue({
      openingTime: '08:30',
      closingTime: '16:30',
      dailyCapacity: 100,
      status: CenterStatus.ACTIVE
    });
  }

  private populateForm(center: VaccinationCenter): void {
    this.vaccinationCenterForm.patchValue({
      id: center.id,
      name: center.name,
      address: center.address,
      city: center.city,
      state: center.state,
      pincode: center.pincode,
      phoneNumber: center.phoneNumber || '',
      openingTime: this.formatTimeForInput(center.openingTime || '08:30:00'),
      closingTime: this.formatTimeForInput(center.closingTime || '16:30:00'),
      dailyCapacity: center.dailyCapacity,
      status: center.status
    });
  }

  private formatTimeForInput(timeString: string): string {
    // Convert "HH:mm:ss" to "HH:mm" for HTML time input
    if (timeString && timeString.length >= 5) {
      return timeString.substring(0, 5);
    }
    return timeString;
  }

  private formatTimeForBackend(timeString: string): string {
    // Convert "HH:mm" to "HH:mm:ss" for backend
    if (timeString && timeString.length === 5) {
      return timeString + ':00';
    }
    return timeString;
  }

  onSubmit(): void {
    if (this.vaccinationCenterForm.valid) {
      const formValue = this.vaccinationCenterForm.value;
      
      // Map form data to VaccinationCenter interface
      const vaccinationCenter: VaccinationCenter = {
        ...(formValue.id && { id: formValue.id }), // Only include id if it exists (for updates)
        name: formValue.name.trim(),
        address: formValue.address.trim(),
        city: formValue.city.trim(),
        state: formValue.state.trim(),
        pincode: formValue.pincode.trim(),
        phoneNumber: formValue.phoneNumber?.trim() || undefined,
        openingTime: this.formatTimeForBackend(formValue.openingTime),
        closingTime: this.formatTimeForBackend(formValue.closingTime),
        dailyCapacity: parseInt(formValue.dailyCapacity),
        status: formValue.status,
        vaccineStocks: this.editingCenter?.vaccineStocks || [],
        appointments: this.editingCenter?.appointments || []
      };

      console.log('🏥 Vaccination Center Data for Backend:', JSON.stringify(vaccinationCenter, null, 2));
      this.centerSaved.emit(vaccinationCenter);
    } else {
      this.markFormGroupTouched();
      console.log('❌ Form is invalid:', this.getFormErrors());
    }
  }

  onCancel(): void {
    this.vaccinationCenterForm.reset();
    this.setDefaultValues();
    this.formCancelled.emit();
  }

  private markFormGroupTouched(): void {
    Object.keys(this.vaccinationCenterForm.controls).forEach(key => {
      const control = this.vaccinationCenterForm.get(key);
      control?.markAsTouched();
    });
  }

  private getFormErrors(): any {
    const errors: any = {};
    Object.keys(this.vaccinationCenterForm.controls).forEach(key => {
      const control = this.vaccinationCenterForm.get(key);
      if (control?.errors) {
        errors[key] = control.errors;
      }
    });
    return errors;
  }

  // Getter methods for template access
  get name() { return this.vaccinationCenterForm.get('name'); }
  get address() { return this.vaccinationCenterForm.get('address'); }
  get city() { return this.vaccinationCenterForm.get('city'); }
  get state() { return this.vaccinationCenterForm.get('state'); }
  get pincode() { return this.vaccinationCenterForm.get('pincode'); }
  get phoneNumber() { return this.vaccinationCenterForm.get('phoneNumber'); }
  get openingTime() { return this.vaccinationCenterForm.get('openingTime'); }
  get closingTime() { return this.vaccinationCenterForm.get('closingTime'); }
  get dailyCapacity() { return this.vaccinationCenterForm.get('dailyCapacity'); }
  get status() { return this.vaccinationCenterForm.get('status'); }
}
