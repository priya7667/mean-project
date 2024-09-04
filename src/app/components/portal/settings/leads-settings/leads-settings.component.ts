import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-leads-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './leads-settings.component.html',
  styleUrls: ['./leads-settings.component.scss'],
})
export class LeadsSettingsComponent implements OnInit {
  leadsForm: FormGroup;
  leadsData: any[] = [];
  leadStatuses: any[] = [];

  private fb = inject(FormBuilder);
  private apiService = inject(ApiService);

  constructor() {
    this.leadsForm = this.fb.group({
      name: ['', Validators.required],
      for: ['', Validators.required],
      formGroup: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchLeadsData();
    this.fetchLeadStatuses();
  }

  fetchLeadsData(): void {
    this.apiService.get<any[]>('leads').subscribe(data => {
      this.leadsData = data;
    });
  }

  fetchLeadStatuses(): void {
    this.apiService.get<any[]>('settings/leads/statuses').subscribe(data => {
      this.leadStatuses = data;
    });
  }

  onSubmit(): void {
    if (this.leadsForm.valid) {
      this.apiService.post('leads', this.leadsForm.value).subscribe(() => {
        this.fetchLeadsData();
        this.leadsForm.reset();
      });
    }
  }
}
