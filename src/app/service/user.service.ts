import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LoggedUserData } from '../interface/logged-user-data';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = `${environment.api.baseUrl}${environment.api.auth.getUserInfo}`; // Full URL
  private userSubject = new BehaviorSubject<LoggedUserData | null>(null);  // Cached user data

  constructor(private http: HttpClient) {}

  fetchUserData(): Observable<LoggedUserData> {
    return this.http.get<LoggedUserData>(this.userUrl).pipe(
      tap(userData => {
        this.userSubject.next(userData);  // Cache the user data
      })
    );
  }

  getUserData(): Observable<LoggedUserData | null> {
    return this.userSubject.asObservable();  // Expose user data as observable
  }

  getUserSnapshot(): LoggedUserData | null {
    return this.userSubject.getValue();  // Get the current cached value
  }
}
