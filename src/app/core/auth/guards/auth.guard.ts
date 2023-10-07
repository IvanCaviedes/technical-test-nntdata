import { Injectable, inject } from '@angular/core';
import {
  CanMatchFn,
  Route,
  Router,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
class AuthGuard {
  constructor(private _authService: AuthService, private _router: Router) {}

  canMatch(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.check(segments);
  }

  check(segments: UrlSegment[]): Observable<boolean | UrlTree> {
    return this._authService.checkAuth().pipe(
      switchMap((authenticated) => {
        if (!authenticated) {
          const redirectURL = `/${segments.join('/')}`;
          const urlTree = this._router.parseUrl(
            `sign-in?redirectURL=${redirectURL}`
          );

          return of(urlTree);
        }
        return of(true);
      })
    );
  }
}

export const IsAuthGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  return inject(AuthGuard).canMatch(route, segments);
};
