import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../../services/api.service';
import { OpportunitiesData } from '../../../../interface/Opportunities-master/opportunities-data'; // Ensure correct path
import { environment } from '../../../../../environments/environment';
import { CommonModule, DatePipe } from '@angular/common';
import { ToastService } from '../../../../services/toast.service';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  opportunity: OpportunitiesData | null = null;
  private apiGetOpportunitiesUrl = environment.api.opportunitiesMaster.get; // Update to correct URL
  private apiCloneOpportunityUrl = environment.api.opportunitiesMaster.clone; // Update to correct URL
  private apiDeleteOpportunityUrl = environment.api.opportunitiesMaster.delete; // Update to correct URL

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadOpportunityData();
  }

  private loadOpportunityData(): void {
    const opportunityId = this.route.snapshot.paramMap.get('id');
    if (opportunityId) {
      this.apiService.get<OpportunitiesData>(`${this.apiGetOpportunitiesUrl}/${opportunityId}`).subscribe({
        next: (opportunityData) => {
          this.opportunity = opportunityData;
        },
        error: (error) => {
          console.error('Error fetching opportunity:', error);
          this.toastService.showToast('Error fetching opportunity', 'error');
        }
      });
    }
  }

  onEditClick(): void {
    const opportunityId = this.route.snapshot.paramMap.get('id');
    if (opportunityId) {
      this.router.navigate([`/portal/opportunities/edit/${opportunityId}`]);
    }
  }

  onDeleteClick(): void {
    const confirmation = window.confirm('Are you sure you want to delete this opportunity?');
    if (confirmation) {
      const opportunityId = this.route.snapshot.paramMap.get('id');
      if (opportunityId) {
        this.apiService.delete(`${this.apiDeleteOpportunityUrl}/${opportunityId}`).subscribe({
          next: () => {
            this.toastService.showToast('Opportunity deleted successfully!', 'success');
            this.router.navigate(['/portal/opportunities/list']);
          },
          error: (error) => {
            this.toastService.showToast('Error deleting opportunity', 'error');
            console.error('Error deleting opportunity:', error);
          }
        });
      }
    }
  }

  onPrintClick(): void {
    window.print();
  }

  onCloneClick(): void {
    const confirmation = window.confirm('Are you sure you want to clone this opportunity?');
    if (confirmation) {
      const opportunityId = this.route.snapshot.paramMap.get('id');
      if (opportunityId) {
        this.apiService.post<OpportunitiesData>(`${this.apiCloneOpportunityUrl}/${opportunityId}`, {}).subscribe({
          next: (clonedOpportunity) => {
            this.toastService.showToast('Opportunity cloned successfully!', 'success');
            this.router.navigate([`/portal/opportunities/edit/${clonedOpportunity._id}`]); // Redirect to the cloned opportunity's view page
          },
          error: (error) => {
            this.toastService.showToast('Error cloning opportunity', 'error');
            console.error('Error cloning opportunity:', error);
          }
        });
      }
    }
  }
}
