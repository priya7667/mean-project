import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { UserService } from '../../../service/user.service';
import { LoggedUserData } from '../../../interface/logged-user-data';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [], // You can import other needed Angular modules or components here
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loggedUserData: LoggedUserData | null = null;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserData().subscribe({
      next: data => {
        this.loggedUserData = data;
        console.log('User data in Dashboard:', this.loggedUserData);
      }
    });
  }
}
