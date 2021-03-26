import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

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
    this.form = this._fb.group(
      {
        username: ['', Validators.required],
        email: ['', Validators.email],
        password: ['', Validators.required]
      });
  }

  public onSubmit(): void {
    this.invalid = false;
    if (this.form.valid) {
      try {
        const user: User = {
          username: this.form.get('username')?.value,
          password: this.form.get('password')?.value,
          email: this.form.get('email')?.value
        };

        this._authService.registerUser(user)
          .subscribe({
            next: (success: boolean) => {
              if (success) {
                this.goBack();
              } else {
                this.invalid = true;
              }
            }
          });

      } catch (err) {
        this.error = err;
        this.invalid = true;
      }
    }
  }

  public goBack(): void {
    this._router.navigate(['/auth']);
  }
}
