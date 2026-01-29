import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tokenKey } from '../constants/general';
import { IApiResponse } from '../interfaces/api';
import { environment } from '../../../environments/environment';
import { apisList } from '../constants/aips';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  private user = new BehaviorSubject<any>({});
  user$ = this.user.asObservable();

  setUser(user: any) {
    this.user.next(user);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(tokenKey);
    return !!token;
  }

  logout(): void {
    this.removeToken();
    this.router.navigate(['/auth']);
  }

  setToken(token: string): void {
    localStorage.setItem(tokenKey, token);
  }

  getToken(): string {
    return localStorage.getItem(tokenKey) || '';
  }

  getUserName(): string {
    const token = this.getToken();
    if (!token) return '';
    try {
      const tokenDetails: any = jwtDecode(token);
      return tokenDetails && tokenDetails.name ? tokenDetails.name : '';
    } catch (e) {
      return '';
    }
  }

  removeToken(): void {
    localStorage.removeItem(tokenKey);
  }

  getUserPermissions(): string[] {
    const data = localStorage.getItem('user_permissions'); // get form token
    return data ? JSON.parse(data) : [];
  }

  login(body: any): Observable<IApiResponse> {
    return this.http.post<IApiResponse>(environment.apiUrl + apisList.auth.login, body)
  }

}
