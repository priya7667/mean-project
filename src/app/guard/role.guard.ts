import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Check if the user is authenticated
  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  // Get role and branch from localStorage
  const role = authService.getRole();
  const branch = authService.getBranch();

  // Check role and branch
  if (role === 'admin') {
    return true;
  } else if (role === 'user' && branch === 'branch1') {
    return true;
  } else if (role === 'user' && branch === 'branch2') {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
