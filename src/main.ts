import { bootstrapApplication } from '@angular/platform-browser';
import { sharedProviders } from './app/core/shared-providers'; // Adjust the path as needed
import { AppComponent } from './app/app.component';  // Root component

bootstrapApplication(AppComponent, {
  providers: [...sharedProviders]
}).catch(err => console.error(err));