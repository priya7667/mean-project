import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toastSubject = new Subject<any>();
  toastState = this.toastSubject.asObservable();

  showToast(message: string, type: 'success' | 'error' = 'success') {
    this.toastSubject.next({ message, type });
  }
}
