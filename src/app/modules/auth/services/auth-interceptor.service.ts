import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { cast, Is } from 'src/app/shared/utils/utils'
import { AuthService } from './auth.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly _authService: AuthService) { }

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        'Content-Type': 'application/json; charset=utf-8',
        Accept: 'application/json'
      }
    })
    if (Is.Defined(this._authService.authToken)) {
      req = req.clone({
        setHeaders: {
          Authorization: cast<string>(this._authService.authToken),
        }
      })
    }
    return next.handle(req)
  }
}
