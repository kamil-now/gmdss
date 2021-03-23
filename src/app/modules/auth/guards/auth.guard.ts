import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router
  ) {
  }

  public canActivate(_: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const authRoutes = ['/auth', '/register', '/login'];
    const loggedIn = this._authService.isLoggedIn();
    if (loggedIn && authRoutes.some(x => state.url.includes(x))) {
      this._router.navigate(['/dashboard']);
      return false;
    }
    if (!loggedIn && state.url.includes('/login')) {
      return true;
    }
    if (!loggedIn && !authRoutes.includes(state.url)) {
      this._router.navigate(['/auth']);
      return false;
    }
    return true;
  }
}
