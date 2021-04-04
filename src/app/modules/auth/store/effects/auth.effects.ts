import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { filter, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { AppState } from 'src/app/app.store';
import { cast } from 'src/app/shared/utils/utils';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../../auth/services/auth.service';
import { LoginData } from '../../models/login-data';
import { AuthActionTypes, Login, Logout, Register, UserLoaded, UserRequested } from '../actions/auth.actions';
import { isUserLoaded } from '../selectors/auth.selectors';

@Injectable()
export class AuthEffects {

  login$ = createEffect(() =>
    this._actions$.pipe(
      ofType<Login>(AuthActionTypes.Login),
      tap(action => {
        localStorage.setItem(environment.authTokenKey, action.payload.token);
        if (action.payload.user) {
          this._store.dispatch(new UserLoaded({ user: action.payload.user }));
        } else {
          this._store.dispatch(new UserRequested());
        }
      })
    ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this._actions$.pipe(
      ofType<Logout>(AuthActionTypes.Logout),
      tap(() => {
        localStorage.removeItem(environment.authTokenKey);
        this._router.navigate(['/auth']);

      })
    ),
    { dispatch: false }
  );

  register$ = createEffect(() =>
    this._actions$.pipe(
      ofType<Register>(AuthActionTypes.Register),
      tap({
        next: action => localStorage.setItem(environment.authTokenKey, action.payload.token)
      })
    ),
    { dispatch: false }
  );

  loadUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType<UserRequested>(AuthActionTypes.UserRequested),
      withLatestFrom(this._store.pipe(select(isUserLoaded))),
      filter(([_isUserLoaded]) => !_isUserLoaded),
      mergeMap(([_isUserLoaded]) => this._authService.loginWithToken()),
      tap((loginData: LoginData) => {
        if (loginData.user) {
          this._store.dispatch(new UserLoaded({ user: loginData.user }));
        } else {
          this._store.dispatch(new Logout());
        }
      })
    ),
    { dispatch: false }
  );

  onUserLoaded = createEffect(() =>
    this._actions$.pipe(
      ofType<UserLoaded>(AuthActionTypes.UserLoaded),
      tap(() => this._router.navigate(['/']))
    ), { dispatch: false }
  );

  init$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      map(() => {
        const authToken = localStorage.getItem(environment.authTokenKey);
        const isExpired = this._jwtService.isTokenExpired(cast<string>(authToken));
        return !authToken || isExpired
          ? { type: 'NO_ACTION' }
          : new Login({ token: authToken });
      })
    )
  );

  private readonly _jwtService = new JwtHelperService();

  constructor(
    private readonly _actions$: Actions,
    private readonly _router: Router,
    private readonly _authService: AuthService,
    private readonly _store: Store<AppState>
  ) {
  }
}
