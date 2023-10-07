import { Injectable, inject } from '@angular/core';
import { CanMatchFn, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
class NoAuthGuard {
  constructor(private _authService: AuthService) {}

  canMatch(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }
  check(segments: UrlSegment[]): Observable<boolean | UrlTree> {
    return this._authService.checkAuth().pipe(
      switchMap((authenticated) => {
        return of(!authenticated);
      })
    );
  }
}

export const IsNoAuthGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  return inject(NoAuthGuard).canMatch(route, segments);
};
