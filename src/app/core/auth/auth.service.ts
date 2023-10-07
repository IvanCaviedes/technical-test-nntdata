import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authenticated: boolean = false;

  constructor() {}

  signOut() {
    localStorage.removeItem('accessToken');
    this._authenticated = false;
    return of(true);
  }
}
