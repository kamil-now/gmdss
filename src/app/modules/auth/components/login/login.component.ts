import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

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
    private readonly _authService: AuthService
  ) {
  }

  public ngOnInit(): void {
    this.form = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public onSubmit(): void {
    this.invalid = false;
    if (this.form.valid) {
      try {
        let user: User = {
          username: this.form.get('username')?.value,
          password: this.form.get('password')?.value
        };
        this._authService.loginUser(user).subscribe(success => {
          if (success) {
            this._router.navigate(['/']);
          } else {
            this.invalid = true;
          }
        });
      } catch (err) {
        this.error = err;
        this.invalid = true;
      }
    }
  }
}
