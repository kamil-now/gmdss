import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';
import { AppState } from 'src/app/app.store';
import { isLoggedIn } from '../store/selectors/auth.selectors';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly _store: Store<AppState>,
    private readonly _router: Router
  ) {
  }

  public canActivate(_routeSnapshot: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<boolean> {
    return this._store
      .pipe(
        select(isLoggedIn),
        tap(loggedIn => {
          if (!loggedIn) {
            this._router.navigateByUrl('/auth/login');
          }
        })
      );
  }
}
