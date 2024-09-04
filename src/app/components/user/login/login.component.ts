import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService // Inject ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void { }

  login(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (res) => {
          // Store the token
          localStorage.setItem('token', res.token);

          // Store user information in AuthService
          this.authService.setUser(res.user); // Set full user data in AuthService
          this.authService.setRole(res.user.role); // Set role in AuthService
          this.authService.setBranch(res.user.branch); // Set branch in AuthService

          // Show success toast and navigate to portal
          this.toastService.showToast('Login successfully.', 'success');
          this.router.navigate(['/portal']);
        },
        error: (err) => {
          // Display error message received from the backend
          const errorMessage = err.error?.msg || 'Login failed. Please try again.';
          this.toastService.showToast(errorMessage, 'error');
          console.error(err);
        },
      });
    } else {
      this.toastService.showToast('Please fill out all required fields correctly.', 'error');
      this.loginForm.markAllAsTouched(); // Mark all fields as touched to trigger validation messages
    }
  }
}
