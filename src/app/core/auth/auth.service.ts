import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap, throwError } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authenticated: boolean = false;

  constructor(
    private _httpClient: HttpClient,
    private _userService: UserService
  ) {}

  set accessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  get accessToken(): string {
    return localStorage.getItem('accessToken') ?? '';
  }

  signOut() {
    localStorage.removeItem('accessToken');
    this._authenticated = false;
    return of(true);
  }

  checkAuth(): Observable<boolean> {
    if (this._authenticated) {
      return of(true);
    }
    if (!this.accessToken) {
      return of(false);
    }
    this._authenticated = true;
    return of(true);
  }

  signIn(credentials: {
    username: string;
    password: string;
    country: string;
  }): Observable<any> {
    if (this._authenticated) {
      return throwError(() => 'User is already logged in.');
    }
    return this._httpClient.post('api/auth/sign-in', credentials).pipe(
      switchMap((response: any) => {
        if (response.accessToken) {
          this.accessToken = response.accessToken;
        }
        this._authenticated = true;
        this._userService.user = response.user;
        return of(true);
      })
    );
  }

  signUp(credentials: {
    username: string;
    password: string;
    country: string;
  }): Observable<any> {
    if (this._authenticated) {
      return throwError(() => 'User is already logged in.');
    }
    return this._httpClient.post('api/auth/sign-up', credentials).pipe(
      switchMap((response: any) => {
        if (response.accessToken) {
          this.accessToken = response.accessToken;
        }

        this._authenticated = true;
        this._userService.user = response.user;
        return of(true);
      })
    );
  }
}
