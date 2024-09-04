import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { LoggedUserData } from '../../../interface/logged-user-data';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  activeRoute: string = '';
  loggedUserData: LoggedUserData | null = null;

  constructor(private router: Router, private userService: UserService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activeRoute = event.urlAfterRedirects.split('/')[2]; // Adjust according to your URL structure
      }
    });
  }

  ngOnInit(): void {
    // Fetch user data when the component initializes
    this.userService.fetchUserData().subscribe({
      next: data => {
        this.loggedUserData = data;
        console.log('User data fetched:', this.loggedUserData);
      },
      error: error => {
        console.error('Error fetching user data:', error);
      }
    });
  }

  isActive(route: string): boolean {
    return this.activeRoute === route;
  }
}
