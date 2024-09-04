import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../services/api.service';
import { environment } from '../../../../../environments/environment';
import { ToastService } from '../../../../services/toast.service';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { OpportunitiesData } from '../../../../interface/Opportunities-master/opportunities-data';

@Component({
  selector: 'app-manage-opportunities-form',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, ReactiveFormsModule],
  templateUrl: './manage-opportunities-form.component.html',
  styleUrls: ['./manage-opportunities-form.component.scss'] // Fixed typo here
})
export class ManageOpportunitiesFormComponent implements OnInit {

  private apiAddOpportunityUrl = environment.api.opportunitiesMaster.add;
  private apiGetOpportunityUrl = environment.api.opportunitiesMaster.get;
  private apiUpdateOpportunityUrl = environment.api.opportunitiesMaster.update;

  opportunityForm: FormGroup;
  isEditMode = false;
  opportunityId: string | null = null;

  formSettings: { [key: string]: any[] } = {};

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) {
    this.opportunityForm = this.fb.group({
      owner: [{ value: 'Sujay Sen', disabled: true }, Validators.required],
      basicInformation: this.fb.group({
        owner: [{ value: 'Sujay Sen', disabled: true }, Validators.required],
        opportunityName: ['', Validators.required],
        account: ['', Validators.required],
        category: ['', Validators.required],
        contact: ['', Validators.required],
        amount: ['', Validators.required],
        closeDate: ['', Validators.required],
        stage: ['', Validators.required],
        probability: ['', Validators.required],
        submitDateInternal: ['', Validators.required],
        submissionAmount: ['', Validators.required],
        submissionDateHQ: ['', Validators.required],
        disbursementAmount: ['', Validators.required],
        disbursementDateHQ: ['', Validators.required],
        companyType: ['', Validators.required],
        posBackDate: ['', Validators.required],
        dateApplicationCancelled: ['', Validators.required],
        approvalDate: ['', Validators.required],
        adminRemarks: ['', Validators.required],
        commRcvdDate: ['', Validators.required],
        nric: ['', Validators.required],
        commPayDate: ['', Validators.required],
        typeOfLoan: ['', Validators.required],
        chewqueNo: ['', Validators.required],
        financeRemarks: ['', Validators.required],
      }),
      additionalInformation: this.fb.group({
        leadSource: ['', Validators.required],
        nextStep: ['', Validators.required],
      }),
      descriptionInformation: this.fb.group({
        description: ['', Validators.required]
      }),
      customInformation: this.fb.group({
        posOutDate: ['', Validators.required],
        payslipType: ['', Validators.required],
        posOutLoanAmount: ['', Validators.required],
        contactNumber: ['', Validators.required],
        posTrackingInfo: ['', Validators.required],
        inquiryDate: ['', Validators.required],
      })
    });
  }

  ngOnInit(): void {
    this.fetchFormSettings();
    this.opportunityId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.opportunityId;

    if (this.isEditMode && this.opportunityId) {
      this.apiService.get<OpportunitiesData>(`${this.apiGetOpportunityUrl}/${this.opportunityId}`).subscribe({
        next: (opportunitiesData) => {
          this.formatDates(opportunitiesData);
          console.log('Fetched Opportunity Data:', opportunitiesData);
          this.opportunityForm.patchValue(opportunitiesData);
          console.log('Patched Form Value:', this.opportunityForm.value);
        },
        error: (error) => {
          console.error('Error fetching opportunity:', error);
          this.toastService.showToast('Error fetching opportunity data', 'error');
        }
      });
    }
  }
  formatDateToYMD(date: string | Date): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  formatDates(itmData: OpportunitiesData): void {
    if (itmData.basicInformation.closeDate) {
      itmData.basicInformation.closeDate = this.formatDateToYMD(itmData.basicInformation.closeDate);
    }
    if (itmData.basicInformation.submitDateInternal) {
      itmData.basicInformation.submitDateInternal = this.formatDateToYMD(itmData.basicInformation.submitDateInternal);
    }
    if (itmData.basicInformation.submissionDateHQ) {
      itmData.basicInformation.submissionDateHQ = this.formatDateToYMD(itmData.basicInformation.submissionDateHQ);
    }
    if (itmData.basicInformation.disbursementDateHQ) {
      itmData.basicInformation.disbursementDateHQ = this.formatDateToYMD(itmData.basicInformation.disbursementDateHQ);
    }
    if (itmData.basicInformation.posBackDate) {
      itmData.basicInformation.posBackDate = this.formatDateToYMD(itmData.basicInformation.posBackDate);
    }
    if (itmData.basicInformation.dateApplicationCancelled) {
      itmData.basicInformation.dateApplicationCancelled = this.formatDateToYMD(itmData.basicInformation.dateApplicationCancelled);
    }
    if (itmData.basicInformation.approvalDate) {
      itmData.basicInformation.approvalDate = this.formatDateToYMD(itmData.basicInformation.approvalDate);
    }
    if (itmData.basicInformation.commRcvdDate) {
      itmData.basicInformation.commRcvdDate = this.formatDateToYMD(itmData.basicInformation.commRcvdDate);
    }
    if (itmData.basicInformation.commPayDate) {
      itmData.basicInformation.commPayDate = this.formatDateToYMD(itmData.basicInformation.commPayDate);
    }
    if (itmData.customInformation.posOutDate) {
      itmData.customInformation.posOutDate = this.formatDateToYMD(itmData.customInformation.posOutDate);
    }
    if (itmData.customInformation.inquiryDate) {
      itmData.customInformation.inquiryDate = this.formatDateToYMD(itmData.customInformation.inquiryDate);
    }
    if (itmData.createdAt) {
      itmData.createdAt = this.formatDateToYMD(itmData.createdAt);
    }
    if (itmData.updatedAt) {
      itmData.updatedAt = this.formatDateToYMD(itmData.updatedAt);
    }
    // Add similar date formatting for other date fields if necessary
  }

  fetchFormSettings(): void {
    this.apiService.getFormSettings({ setting_key: 'DropDownSettings' })
      .subscribe({
        next: (data) => {
          this.formSettings = this.transformSettings(data); // Transform data into a usable format
        },
        error: (error) => {
          console.error('Error fetching form settings:', error);
          this.toastService.showToast('Error fetching form settings', 'error');
        }
      });
  }

  transformSettings(settings: any[]): { [key: string]: any[] } {
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

  onSubmit(): void {
    if (this.opportunityForm.valid) {
      const formData = this.opportunityForm.getRawValue();
      console.log('Form Data:', formData);

      if (this.isEditMode) {
        this.apiService.put(`${this.apiUpdateOpportunityUrl}/${this.opportunityId}`, formData).subscribe({
          next: (response) => {
            console.log('Update Response:', response);
            this.toastService.showToast('Opportunity updated successfully!', 'success');
            this.router.navigate(['/portal/opportunities/list']);
          },
          error: (error) => {
            console.error('Error updating opportunity:', error);
            this.toastService.showToast('Error updating opportunity', 'error');
          }
        });
      } else {
        this.apiService.post(this.apiAddOpportunityUrl, formData).subscribe({
          next: (response) => {
            console.log('Create Response:', response);
            this.toastService.showToast('Opportunity created successfully!', 'success');
            this.router.navigate(['/portal/opportunities/list']);
          },
          error: (error) => {
            console.error('Error creating opportunity:', error);
            this.toastService.showToast('Error creating opportunity', 'error');
          }
        });
      }
    } else {
      this.toastService.showToast('Please fill all required fields', 'error');
      this.opportunityForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.router.navigate(['/portal/opportunities/list']);
  }
}
