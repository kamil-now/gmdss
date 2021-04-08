import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

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
    return this.http.get<T>(this._formatUrl(name), requestOptions);
  }

  protected getWithCredentials<T = any>(name?: string): Observable<T> {
    const opt = this.options;
    opt.withCredentials = true;
    return this.http.get<T>(this._formatUrl(name), opt);
  }

  protected post<T = any>(name: string, body: string, options?: IHttpOptions): Observable<T> {
    const requestOptions = options ? options : this.options;
    return this.http.post<T>(this._formatUrl(name), body, requestOptions);
  }

  protected delete<T = any>(name: string, options?: IHttpOptions): Observable<T> {
    return this.http.delete<T>(this._formatUrl(name), options ? options : this.options)
  }

  protected postWithCredentials<T = any>(name: string, body: string): Observable<T> {
    const opt = this.options;
    opt.withCredentials = true;
    return this.http.post<T>(this._formatUrl(name), body, opt);
  }

  protected put<T = any>(name: string, body: string): Observable<T> {
    return this.http.put<T>(this._formatUrl(name), body, this.options);
  }

  private _formatUrl(name?: string): string {
    return name ? this.url + name : this.url;
  }
}
