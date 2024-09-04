import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-drop-down-settings',
  standalone: true,
  templateUrl: './drop-down-settings.component.html',
  styleUrls: ['./drop-down-settings.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class DropDownSettingsComponent implements OnInit {
  dropDownForm: FormGroup;
  formSettings: any[] = [];
  settingKeys: string[] = [];
  modules: string[] = [];
  forms: string[] = [];
  fields: { key: string, label: string }[] = [];
  staticFormData: any = {};
  isEditMode = false;
  currentSettingId: string | null = null;

  constructor(private fb: FormBuilder, private apiService: ApiService, private http: HttpClient) {
    this.dropDownForm = this.fb.group({
      setting_key: ['', Validators.required],
      module_name: [{ value: '', disabled: true }, Validators.required],
      form_name: [{ value: '', disabled: true }, Validators.required],
      field_name: [{ value: '', disabled: true }, Validators.required],
      value: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadStaticFormData();
    this.fetchFormSettings();
    this.dropDownForm.get('setting_key')?.valueChanges.subscribe(settingKey => {
      this.updateModules(settingKey);
    });
    this.dropDownForm.get('module_name')?.valueChanges.subscribe(moduleName => {
      this.updateForms(moduleName);
    });
    this.dropDownForm.get('form_name')?.valueChanges.subscribe(formName => {
      this.updateFields(formName);
    });
  }

  loadStaticFormData(): void {
    this.http.get<any>('settings/drop-down-select-value.json').subscribe(data => {
      this.staticFormData = data;
      console.log('Static Form Data Loaded:', this.staticFormData); // Debugging output
      this.settingKeys = Object.keys(this.staticFormData);
    });
  }


  fetchFormSettings(): void {
    this.apiService.getDropdownValues().subscribe(data => {
      this.formSettings = data;
    });
  }

  updateModules(settingKey: string): void {
    const selectedSetting = this.staticFormData[settingKey];

    if (selectedSetting && selectedSetting.modules) {
      this.modules = Object.keys(selectedSetting.modules);
    } else {
      this.modules = [];
    }

    this.dropDownForm.get('module_name')?.enable();  // Ensuring the control is enabled
    this.dropDownForm.get('module_name')?.reset();

    this.dropDownForm.get('form_name')?.disable();   // Disabling until module selected
    this.dropDownForm.get('field_name')?.disable();  // Disabling until form selected
  }


  updateForms(moduleName: string): void {
    const settingKey = this.dropDownForm.get('setting_key')?.value;
    const forms = this.staticFormData[settingKey]?.modules[moduleName]?.forms || {};
    this.forms = Object.keys(forms);
    this.dropDownForm.get('form_name')?.reset();
    this.dropDownForm.get('form_name')?.enable();
    this.dropDownForm.get('field_name')?.reset();
    this.fields = [];
    this.dropDownForm.get('field_name')?.disable();

    if (this.forms.length === 1) {
      const autoSelectedForm = this.forms[0];
      this.dropDownForm.get('form_name')?.setValue(autoSelectedForm);
      this.updateFields(autoSelectedForm);
    }
  }

  updateFields(formName: string): void {
    const settingKey = this.dropDownForm.get('setting_key')?.value;
    const moduleName = this.dropDownForm.get('module_name')?.value;
    const fields = this.staticFormData[settingKey]?.modules[moduleName]?.forms[formName]?.fields || {};
    this.fields = Object.entries(fields).map(([key, label]) => ({ key, label: label as string }));
    this.dropDownForm.get('field_name')?.reset();
    this.dropDownForm.get('field_name')?.enable();
  }

  onSubmit(): void {
    if (this.dropDownForm.invalid) {
      // Mark all controls as touched to trigger validation messages
      this.dropDownForm.markAllAsTouched();
      return;
    }
    if (this.dropDownForm.valid) {
      const formData = this.dropDownForm.value;

      if (this.isEditMode && this.currentSettingId) {
        // Update existing setting
        this.apiService.updateDropdownValue(this.currentSettingId, formData).subscribe({
          next: (data) => {
            console.log('Form setting updated successfully:', data);
            this.resetForm();
            this.fetchFormSettings(); // Refresh the list after update
          },
          error: (error) => {
            console.error('Error updating form setting:', error);
          }
        });
      } else {
        // Create new setting
        this.apiService.saveDropdownValue(formData).subscribe({
          next: (data) => {
            console.log('Form setting saved successfully:', data);
            this.resetForm();
            this.fetchFormSettings(); // Refresh the list after saving
          },
          error: (error) => {
            console.error('Error saving form setting:', error);
          }
        });
      }
    }
  }

  onDelete(id: string): void {
    if (confirm('Are you sure you want to delete this setting?')) {
      this.apiService.deleteDropdownValue(id).subscribe({
        next: () => {
          console.log('Form setting deleted successfully');
          this.fetchFormSettings(); // Refresh the list after deletion
        },
        error: (error) => {
          console.error('Error deleting form setting:', error);
        }
      });
    }
  }

  onEdit(setting: any): void {
    this.isEditMode = true;
    this.currentSettingId = setting._id;

    this.dropDownForm.get('setting_key')?.setValue(setting.setting_key);
    this.updateModules(setting.setting_key);

    setTimeout(() => {
      this.dropDownForm.get('module_name')?.enable();
      this.dropDownForm.get('module_name')?.setValue(setting.module_name);

      this.updateForms(setting.module_name);

      setTimeout(() => {
        this.dropDownForm.get('form_name')?.enable();
        this.dropDownForm.get('form_name')?.setValue(setting.form_name);

        this.updateFields(setting.form_name);

        setTimeout(() => {
          this.dropDownForm.get('field_name')?.enable();
          this.dropDownForm.get('field_name')?.setValue(setting.field_name);
          this.dropDownForm.get('value')?.setValue(setting.value);
        }, 0);

      }, 0);

    }, 0);
  }

  resetForm(): void {
    this.dropDownForm.reset();
    this.isEditMode = false;
    this.currentSettingId = null;
    this.dropDownForm.get('module_name')?.disable();
    this.dropDownForm.get('form_name')?.disable();
    this.dropDownForm.get('field_name')?.disable();
  }
}
