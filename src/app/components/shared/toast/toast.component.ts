import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../../services/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent implements OnInit {
  showToast: boolean = false;
  toastMessage: string = '';
  toastClass: string = '';

  constructor(private toastService: ToastService) { }

  ngOnInit(): void {
    this.toastService.toastState.subscribe((toast) => {
      this.toastMessage = toast.message;
      this.toastClass = toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white';
      this.showToast = true;
      this.hideToastAfterDelay();
    });
  }

  hideToastAfterDelay() {
    setTimeout(() => {
      this.showToast = false;
    }, 3000); // Toast will disappear after 3 seconds
  }

  closeToast() {
    this.showToast = false; // Close the toast when the close button is clicked
  }
}
