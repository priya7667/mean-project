import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  imports: [CommonModule,RouterLink]
})
export class SettingsComponent {
  constructor(private router: Router) {}

  navigateTo(path: string): void {
    this.router.navigate([`/portal/settings/${path}`]);
  }
}
