import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../../services/api.service';
import { Lead } from '../../../../interface/leads-master/leads-main';
import { environment } from '../../../../../environments/environment';
import { CommonModule, DatePipe } from '@angular/common';
import { ToastService } from '../../../../services/toast.service';
import { UserService } from '../../../../service/user.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-view',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe,FormsModule],
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  lead: Lead | null = null;  // lead can be null
  private apiGetLeadsUrl = environment.api.leadsMaster.get;
  private apiEnv = environment.api;
  private apiCloneLeadUrl = environment.api.leadsMaster.clone;

  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService, private userService: UserService, private toastService: ToastService) { }

  ngOnInit(): void {
    const leadId = this.route.snapshot.paramMap.get('id');
    if (leadId) {
      this.apiService.get<Lead>(`${environment.api.leadsMaster.get}/${leadId}`).subscribe({
        next: (leadData) => {
          this.lead = leadData;
        },
        error: (error) => {
          console.error('Error fetching lead:', error);
        }
      });
    }
    this.fetchUsers();
  }
  onEditClick(): void {
    const leadId = this.route.snapshot.paramMap.get('id');
    if (leadId) {
      this.router.navigate([`/portal/leads/edit/${leadId}`]);
    }
  }
  onDeleteClick(): void {
    const confirmation = window.confirm('Are you sure you want to delete this lead?');

    if (confirmation) {
      const leadId = this.route.snapshot.paramMap.get('id');
      if (leadId) {
        this.apiService.delete(`${this.apiEnv.leadsMaster.delete}/${leadId}`).subscribe({
          next: () => {
            this.toastService.showToast('Lead deleted successfully!', 'success');
            this.router.navigate(['/portal/leads/list']);
          },
          error: (error) => {
            this.toastService.showToast('Error deleting lead', 'error');
            // You can add error handling here, like showing a notification to the user
          }
        });
      }
    }
  }
  onPrintClick(): void {
    window.print();
  }
  onCloneClick(): void {
    const confirmation = window.confirm('Are you sure you want to clone this lead?');

    if (confirmation) {
      const leadId = this.route.snapshot.paramMap.get('id');
      if (leadId) {
        this.apiService.post<Lead>(`${this.apiCloneLeadUrl}/${leadId}`, {}).subscribe({
          next: (clonedLead) => {
            this.toastService.showToast('Lead cloned successfully!', 'success');
            this.router.navigate([`/portal/leads/edit/${clonedLead._id}`]); // Redirect to the cloned lead's view page
          },
          error: (error) => {
            this.toastService.showToast('Error cloning lead', 'error');
            console.error('Error cloning lead:', error);
          }
        });
      }
    }
  }
  isChangeOwnerModalOpen = false;
  users: Array<{ _id: string, name: string }> = [];
  filteredUsers: Array<{ _id: string, name: string }> = [];
  searchTerm = '';
  selectedOwnerId: string | null = null;
  isDropdownOpen = false;

  fetchUsers(): void {
    this.apiService.get<Array<{ _id: string, name: string }>>(`${environment.api.users.getOwners}`).subscribe({
      next: (usersData) => {
        this.users = usersData;
        this.filteredUsers = usersData;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

  onSearchChange(): void {
    this.filteredUsers = this.users.filter(user =>
      user.name && user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  selectUser(user: { _id: string, name: string }): void {
    console.log(user);
    this.searchTerm = user.name;
    this.selectedOwnerId = user._id;
    this.isDropdownOpen = false;
    alert(this.selectedOwnerId);
  }

  onChangeOwnerClick(): void {
    this.isChangeOwnerModalOpen = true;
  }

  onChangeOwnerConfirm(): void {
    if (this.selectedOwnerId && this.lead) {
      const previousOwnerId = typeof this.lead.owner === 'object' && this.lead.owner ? this.lead.owner._id : this.lead.owner;

      const updateData = {
        owner: this.selectedOwnerId || '',  // Ensure it's always a string
        newOwnerId: this.selectedOwnerId || '',  // For tracking purposes (if required by your schema)
        previousOwner: previousOwnerId,  // Tracking the previous owner in the owner history
        //changedBy: this.userService.getUserSnapshot()?._id || '',  // ID of the user making the change
        changeDate: new Date()  // Date of change
      };
      //console.log(updateData.changedBy);
      this.apiService.put(`${environment.api.leadsMaster.updateOwner}/${this.lead._id}`, updateData).subscribe({
        next: () => {
          this.toastService.showToast('Owner changed successfully!', 'success');
          this.isChangeOwnerModalOpen = false;
          if (this.lead) {
            this.lead.owner = {
              _id: this.selectedOwnerId || '',  // Ensure it's always a string
              name: this.users.find(user => user._id === this.selectedOwnerId)?.name || 'Unknown Owner'
            }; // Update the UI to reflect the new owner
          }
        },
        error: (error) => {
          this.toastService.showToast('Error changing owner', 'error');
          console.error('Error changing owner:', error);
        }
      });
    } else {
      this.toastService.showToast('Please select an owner before confirming.', 'error');
    }
  }


  getOwnerName(lead: Lead | null): string {
    if (!lead || !lead.owner) {
      return 'No Owner Assigned';
    }
    return typeof lead.owner === 'string' ? 'Unknown Owner' : lead.owner.name;
  }
}
