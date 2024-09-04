import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations'; // Optional
import { provideRouter } from '@angular/router';
import { routes } from '../app.routes';
import { authInterceptor } from './interceptor/auth.interceptor';

export const sharedProviders = [
  provideHttpClient(withInterceptors([authInterceptor])),
  provideRouter(routes),
  provideAnimations() // Optional, include if using Angular animations
];
