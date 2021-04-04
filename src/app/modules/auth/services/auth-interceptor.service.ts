import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { cast } from 'src/app/shared/utils/utils';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json'
      }
    });
    const token = localStorage.getItem(environment.authTokenKey);
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: cast<string>(token),
        }
      });
    }
    return next.handle(req);
  }
}
