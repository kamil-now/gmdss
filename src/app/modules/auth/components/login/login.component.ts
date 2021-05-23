import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.store';
import { LoginData } from '../../models/login-data';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { Login } from '../../store/actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form!: FormGroup;
  public invalid!: boolean;
  public error!: string;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _authService: AuthService,
    private readonly _store: Store<AppState>
  ) {
  }

  public ngOnInit(): void {
    this._activatedRoute.queryParams
      .subscribe({
        next: (params: Params) => {
          if (params.data) {
            const data = JSON.parse(params.data);
            this._store.dispatch(new Login(data));
          }
          this._router.navigate(['/']);
        }
      });
    this.form = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public onSubmit(): void {
    this.invalid = false;
    if (this.form.valid) {
      try {
        const user: User = {
          username: this.form.get('username')?.value,
          password: this.form.get('password')?.value
        };
        this._authService.loginUser(user)
          .subscribe({
            next: (data: LoginData) => this._store.dispatch(new Login(data))
          });
      } catch (err) {
        this.error = err;
        this.invalid = true;
      }
    }
  }
}
