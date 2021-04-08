import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { environment } from 'src/environments/environment';
import { LoginData } from '../models/login-data';
import { User } from '../models/user';

@Injectable()
export class AuthService extends ApiService {

  constructor(
    http: HttpClient
  ) {
    super(http, '/auth');
  }

  public loginUser(user: User): Observable<LoginData> {
    return this.post<LoginData>('/login', JSON.stringify(user));
  }

  public loginWithGoogle(): Observable<boolean> {
    return this.get('/google');
  }

  public loginWithToken(): Observable<LoginData> {
    return this.post<LoginData>('/token', JSON.stringify({ token: localStorage.getItem(environment.authTokenKey) }));
  }

  public registerUser(user: User): Observable<boolean> {
    return this.post('/register', JSON.stringify(user));
  }
}
