import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.api.baseUrl;
  private authApi = environment.api.auth;
  
  private user: any = null;
  private tokenKey = 'token';
  private roleKey = 'role';
  private branchKey = 'branch';



  constructor(private http: HttpClient) { }
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}${this.authApi.login}`, { email, password });
  }

  // saveUserData(token: string, role: string, branch: string) {
  //   localStorage.setItem('token', token);
  //   localStorage.setItem('role', role);
  //   localStorage.setItem('branch', branch);
  // }

  setUser(user: any): void {
    this.user = user;
  }
  // Set token, role, and branch
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  setRole(role: string): void {
    localStorage.setItem(this.roleKey, role);
  }

  setBranch(branch: string): void {
    localStorage.setItem(this.branchKey, branch);
  }

  // Get token, role, and branch
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getRole(): string | null {
    return localStorage.getItem(this.roleKey);
  }

  getBranch(): string | null {
    return localStorage.getItem(this.branchKey);
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  // Log out
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
    localStorage.removeItem(this.branchKey);
  }
}
