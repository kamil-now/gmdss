import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-verify',
  template: '',
})
export class LoginProxyComponent implements OnInit {
  constructor(
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _authService: AuthService
  ) {
  }
  public ngOnInit(): void {
    this._activatedRoute.queryParams
      .subscribe({
        next: (params: Params) => {
          const data = JSON.parse(params.data);
          if (data.success) {
            this._authService.storeUserData(data.token, data.user);
          }
          this._router.navigate(['/']);
        }
      });
  }
}
