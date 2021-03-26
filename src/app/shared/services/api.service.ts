import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { EMPTY } from 'rxjs/internal/observable/empty';
import { of } from 'rxjs/internal/observable/of';
import { map, mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Response } from '../models/response';
import { cast } from '../utils/utils';

interface IHttpOptions {
  observe: 'body';
  responseType: 'json';
  withCredentials?: boolean;
  params?: HttpParams;
}

export abstract class ApiService {

  public get url(): string {
    return this._apiUrl + this.name;
  }

  protected options: IHttpOptions;

  private readonly _apiUrl = environment.apiUrl;

  protected constructor(
    protected readonly http: HttpClient,
    public readonly name: string
  ) {
    this.options = {
      observe: 'body',
      responseType: 'json',
      withCredentials: false
    };
  }

  protected get<T = any>(name?: string, options?: IHttpOptions): Observable<T> {
    const requestOptions = options ? options : this.options;
    return this.http.get<Response<T>>(this._formatUrl(name), requestOptions)
      .pipe(
        mergeMap(res => this._handleResponse<T>(res))
      );
  }

  protected getBasic(name?: string, options?: IHttpOptions): Observable<boolean> {
    const requestOptions = options ? options : this.options;
    return this.http.get<Response<void>>(this._formatUrl(name), requestOptions)
      .pipe(
        map(res => this._handleBasic(res))
      );
  }

  protected getWithCredentials<T = any>(name?: string): Observable<T> {
    const opt = this.options;
    opt.withCredentials = true;
    return this.http.get<Response<T>>(this._formatUrl(name), opt)
      .pipe(
        mergeMap(res => this._handleResponse<T>(res))
      );
  }

  protected postBasic(name: string, body: string, options?: IHttpOptions): Observable<boolean> {
    const requestOptions = options ? options : this.options;
    return this.http.post<Response<void>>(this._formatUrl(name), body, requestOptions)
      .pipe(
        map(res => this._handleBasic(res))
      );
  }

  protected post<T = any>(name: string, body: string, options?: IHttpOptions): Observable<T> {
    const requestOptions = options ? options : this.options;
    return this.http.post<Response<T>>(this._formatUrl(name), body, requestOptions)
      .pipe(
        mergeMap(res => this._handleResponse<T>(res))
      );
  }

  protected delete<T = any>(name: string, options?: IHttpOptions): Observable<T> {
    return this.http.delete<Response<T>>(this._formatUrl(name), options ? options : this.options)
      .pipe(
        mergeMap(res => this._handleResponse<T>(res))
      );
  }

  protected postWithCredentials<T = any>(name: string, body: string): Observable<T> {
    const opt = this.options;
    opt.withCredentials = true;
    return this.http.post<Response<T>>(this._formatUrl(name), body, opt)
      .pipe(
        mergeMap(res => this._handleResponse<T>(res))
      );
  }

  protected put<T = any>(name: string, body: string): Observable<T | boolean> {
    return this.http.put<Response<T>>(this._formatUrl(name), body, this.options)
      .pipe(
        mergeMap(res => this._handleResponse<T>(res))
      );
  }

  private _handleResponse<T>(res: Response<T>): Observable<T> {
    if (res.success) {
      return of(cast<T>(res.data));
    }
    console.error(res.msg);
    return EMPTY;
  }

  private _handleBasic(res: Response<void>): boolean {
    if (!res.success) {
      console.error(res.msg);
    }
    return res.success;
  }

  private _formatUrl(name?: string): string {
    return name ? this.url + name : this.url;
  }
}
