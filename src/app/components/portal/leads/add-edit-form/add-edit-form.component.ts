import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../services/api.service';
import { environment } from '../../../../../environments/environment';
import { ToastService } from '../../../../services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Lead } from '../../../../interface/leads-master/leads-main';
import { UserService } from '../../../../service/user.service';
import { LoggedUserData } from '../../../../interface/logged-user-data';


@Component({
  selector: 'app-add-edit-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-edit-form.component.html',
  styleUrl: './add-edit-form.component.scss'
})
export class AddEditFormComponent implements OnInit {

  private apiAddLeadsUrl = environment.api.leadsMaster.add;
  private apiGetLeadsUrl = environment.api.leadsMaster.get;
  private apiUpdateLeadsUrl = environment.api.leadsMaster.update;

  leadForm: FormGroup;
  isEditMode = false;
  leadId: string | null = null;

  formSettings: { [key: string]: any[] } = {};
  months: string[] = [];
  years: number[] = [];

  countries: string[] = ['Malaysia'];
  states: string[] = [];
  cities: string[] = [];
  malaysiaData: any;

  constructor(private fb: FormBuilder,
    private apiService: ApiService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService) {
    this.leadForm = this.fb.group({
      owner: [{ value: '', disabled: true }, Validators.required],
      ownerId: ['', Validators.required],
      basicInformation: this.fb.group({
        lastName: ['', Validators.required],
        leadStatus: ['', Validators.required],
        firstName: ['', Validators.required],
        attitude: ['', Validators.required],
        jobTitle: ['', Validators.required],
        leadSource: ['', Validators.required],
        companyName: ['', Validators.required],
        industry: ['', Validators.required],
        mobileNo: ['', Validators.required],
        dateOfBirth: ['', Validators.required],
        secondMobileNo: ['', Validators.required],
        workPhoneNo: ['', Validators.required],
        email: ['', Validators.required],
        workFax: ['', Validators.required],
        secondEmail: ['', Validators.required],
        website: ['', Validators.required],
        nric: ['', Validators.required],
        reason: ['', Validators.required],
        telesalesRemarks: ['', Validators.required],
        payslipType: ['', Validators.required],
        followUp: ['', Validators.required],
        contactNumber: ['', Validators.required],
        inquiryDate: ['', Validators.required],
      }),
      additionalInformation: this.fb.group({
        country: ['Malaysia', Validators.required],
        state: ['', Validators.required],
        city: ['', Validators.required],
        zip: ['', Validators.required],
        street: ['', Validators.required],
      }),
      descriptionInformation: this.fb.group({
        description: ['', Validators.required]
      }),
      customInformation: this.fb.group({
        typeOfLoan: ['', Validators.required],
        payslipMonth: ['', Validators.required],
        posOutDate: ['', Validators.required],
        grossSalary: ['', Validators.required],
        loanAmount: ['', Validators.required],
        deductions: ['', Validators.required],
        trackingInfo: ['', Validators.required],
        netSalary: ['', Validators.required],
        payslipYear: ['', Validators.required]
      })
    });

    this.months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    this.years = this.generateYears();
  }

  ngOnInit(): void {

    this.leadId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.leadId;
    if (this.isEditMode && this.leadId) {
      this.apiService.get<Lead>(`${this.apiGetLeadsUrl}/${this.leadId}`).subscribe({
        next: (leadData) => {
          this.formatDates(leadData);
          this.leadForm.patchValue(leadData);
        },
        error: (error) => {
          console.error('Error fetching lead:', error);
        }
      });
    }
    if (this.isEditMode) {
      this.loadLeadData(this.leadId!);
    } else {
      this.loadCurrentUserAsOwner();
    }
    this.fetchFormSettings();
    this.apiService.getMalaysiaData().subscribe(data => {
      this.malaysiaData = data.Malaysia.states;
      this.states = Object.keys(this.malaysiaData);
    });

    this.leadForm.get('additionalInformation.state')?.valueChanges.subscribe(state => {
      this.cities = this.malaysiaData[state] || [];
      this.leadForm.get('additionalInformation.city')?.reset();
    });
  }
  private loadLeadData(leadId: string): void {
    this.apiService.get<Lead>(`${this.apiGetLeadsUrl}/${leadId}`).subscribe({
      next: (leadData) => {
        this.formatDates(leadData);

        if (typeof leadData.owner === 'object' && leadData.owner !== null) {
          this.leadForm.patchValue({
            ...leadData,
            owner: leadData.owner.name, // Show the name in the owner field
            ownerId: leadData.owner._id // Set the hidden ownerId field
          });
        } else {
          // If owner is a string (just the ID), leave owner field as is
          this.leadForm.patchValue({
            ...leadData,
            ownerId: leadData.owner // Set the ownerId field only
          });
        }
      },
      error: (error) => {
        console.error('Error fetching lead:', error);
      }
    });
  }

  private loadCurrentUserAsOwner(): void {
    this.userService.getUserData().subscribe((userData: LoggedUserData | null) => {
      if (userData) {
        this.leadForm.get('owner')?.setValue(userData.name);
        this.leadForm.get('ownerId')?.setValue(userData.id);
      }
    });
  }
  fetchFormSettings(): void {
    this.apiService.getFormSettings({ setting_key: 'DropDownSettings' })
      .subscribe({
        next: (data) => {
          this.formSettings = this.transformSettings(data); // Transform data into a usable format
        },
        error: (error) => {
          console.error('Error fetching form settings:', error);
        },
        complete: () => {
          console.log('Request completed');
        }
      });
  }

  private transformSettings(settings: any[]): { [key: string]: any[] } {
    const result: { [key: string]: any[] } = {};
    settings.forEach(setting => {
      const { field_name, value } = setting;
      if (!result[field_name]) {
        result[field_name] = [];
      }
      result[field_name].push(value);
    });
    return result;
  }

  private generateYears(): number[] {
    const currentYear = new Date().getFullYear();
    const years: number[] = [];
    for (let year = currentYear; year >= 1900; year--) {
      years.push(year);
    }
    return years;
  }

  onSubmit(): void {
    if (this.leadForm.valid) {
      //console.log(this.leadForm.value);

      // Sending the form data to the server
      const formData: Lead = this.leadForm.value; // Type the form data as Lead
      if (this.isEditMode) {
        // Update existing lead
        this.apiService.put(`${this.apiUpdateLeadsUrl}/${this.leadId}`, this.leadForm.value).subscribe({
          next: (response) => {
            this.toastService.showToast('Lead updated successfully!', 'success');
            this.router.navigate(['/portal/leads/list']);
          },
          error: (error) => {
            this.toastService.showToast('Error updating lead', 'error');
          }
        });
      } else {
        // Create new lead
        this.apiService.post(this.apiAddLeadsUrl, this.leadForm.value).subscribe({
          next: (response) => {
            this.toastService.showToast('Lead created successfully!', 'success');
            this.router.navigate(['/portal/leads/list']);
          },
          error: (error) => {
            this.toastService.showToast('Error creating lead', 'error');
          }
        });
      }
    } else {
      console.error('Form is invalid');
      this.toastService.showToast('Form submission failed. Fill the mandatory fields.', 'error');
      this.leadForm.markAllAsTouched(); // Mark all fields as touched to display validation errors
    }
  }
  formatDates(leadData: Lead): void {
    if (leadData.basicInformation.dateOfBirth) {
      leadData.basicInformation.dateOfBirth = this.formatDateToYMD(leadData.basicInformation.dateOfBirth);
    }
    if (leadData.basicInformation.inquiryDate) {
      leadData.basicInformation.inquiryDate = this.formatDateToYMD(leadData.basicInformation.inquiryDate);
    }
    if (leadData.customInformation.posOutDate) {
      leadData.customInformation.posOutDate = this.formatDateToYMD(leadData.customInformation.posOutDate);
    }
    // Add similar date formatting for other date fields if necessary
  }

  formatDateToYMD(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Returns only the "yyyy-MM-dd" part
  }

  onCancel(): void {
    this.router.navigate(['/portal/leads/list']);
  }
}
