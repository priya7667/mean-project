import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { Lead } from '../../../../interface/leads-master/leads-main'; // Assuming this is the correct interface for leads
import { environment } from '../../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { OpportunitiesData } from '../../../../interface/Opportunities-master/opportunities-data';

@Component({
  selector: 'app-opportunities-list',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './opportunities-list.component.html',
  styleUrls: ['./opportunities-list.component.scss'] // Corrected to styleUrls
})
export class OpportunitiesListComponent implements OnInit {
  private apiGetOpportunitiesUrl = environment.api.opportunitiesMaster.get;
  private apiGetLeadsUrl = environment.api.leadsMaster.get;

  opportnityData: OpportunitiesData[] = [];
  filteredItems: OpportunitiesData[] = [];
  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  pageNumbers: number[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.apiService.get<OpportunitiesData[]>(this.apiGetOpportunitiesUrl) // Assuming this URL returns leads
      .subscribe({
        next: (response) => {
          this.opportnityData = response;
          console.log(this.opportnityData);
          this.totalItems = this.opportnityData.length;
          this.applyFilters();
        },
        error: (error) => {
          console.error('Error fetching leads:', error);
        }
      });
  }

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchQuery = inputElement.value.toLowerCase();
    this.applyFilters();
  }

  applyFilters(): void {
    const filtered = this.opportnityData.filter(itm =>
      itm.owner?.toLowerCase().includes(this.searchQuery) 
      // lead.basicInformation.leadStatus.toLowerCase().includes(this.searchQuery) ||
      // lead.basicInformation.leadSource.toLowerCase().includes(this.searchQuery) ||
      // lead.basicInformation.firstName.toLowerCase().includes(this.searchQuery) ||
      // lead.basicInformation.companyName.toLowerCase().includes(this.searchQuery)
    );

    this.filteredItems = filtered.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
    this.totalItems = filtered.length;
    this.updatePagination();
  }

  onItemsPerPageChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.itemsPerPage = parseInt(selectElement.value, 10);
    this.currentPage = 1; // Reset to the first page when items per page changes
    this.applyFilters();
  }

  updatePagination(): void {
    const totalPages = this.getTotalPages();
    const maxPageButtons = 5;
    let startPage = Math.max(1, this.currentPage - 2);
    let endPage = Math.min(totalPages, this.currentPage + 2);

    if (this.currentPage <= 3) {
      startPage = 1;
      endPage = Math.min(totalPages, maxPageButtons);
    } else if (this.currentPage + 2 >= totalPages) {
      startPage = Math.max(1, totalPages - maxPageButtons + 1);
      endPage = totalPages;
    }

    this.pageNumbers = [];
    if (startPage > 1) {
      this.pageNumbers.push(1);
      if (startPage > 2) {
        this.pageNumbers.push(-1); // Placeholder for ellipsis
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      this.pageNumbers.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        this.pageNumbers.push(-1); // Placeholder for ellipsis
      }
      this.pageNumbers.push(totalPages);
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  goToPage(page: number): void {
    if (page === -1) return;
    this.currentPage = page;
    this.applyFilters();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.applyFilters();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
      this.applyFilters();
    }
  }

  exportAs(format: string): void {
    if (format === 'spreadsheet') {
      this.exportToSpreadsheet();
    } else if (format === 'pdf') {
      this.exportToPDF();
    }
  }

  exportToSpreadsheet(): void {
    console.log('Exporting leads as a spreadsheet');
    // Implement the logic for exporting to spreadsheet here
  }

  exportToPDF(): void {
    console.log('Exporting leads as a PDF');
    // Implement the logic for exporting to PDF here
  }
}
