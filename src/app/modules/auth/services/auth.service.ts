import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/services/api.service';
import { cast, Is } from 'src/app/shared/utils/utils';
import { LoginData } from '../models/login-data';
import { User } from '../models/user';

@Injectable()
export class AuthService extends ApiService {

  public authToken!: string | null;
  public user!: User | null;

  private readonly _jwtService = new JwtHelperService();

  constructor(http: HttpClient) {
    super(http, '/auth');
    this.loadToken();
  }

  public loginUser(user: User): Observable<boolean> {
    return this.post<LoginData>('/login', JSON.stringify(user))
      .pipe(mergeMap(data => {
        if (Is.Defined(data.token)) {
          this.storeUserData(data.token, data.user);
          return of(true);
        }
        return of(false);
      }));
  }

  public loginWithGoogle(): Observable<boolean> {
    return this.getBasic('/google');
  }

  public registerUser(user: User): Observable<boolean> {
    return this.postBasic('/register', JSON.stringify(user));
  }

  public isLoggedIn(): boolean {
    if (!Is.Defined(this.authToken)) {
      return false;
    }
    return !this._jwtService.isTokenExpired(cast<string>(this.authToken));
  }

  public logout(): void {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  public storeUserData(token: any, user: User): void {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.loadToken();
  }

  public loadToken(): void {
    this.authToken = localStorage.getItem('id_token');
    const storageData = localStorage.getItem('user');
    if (Is.Defined(storageData)) {
      this.user = JSON.parse(cast<string>(storageData));
    }
  }
}
