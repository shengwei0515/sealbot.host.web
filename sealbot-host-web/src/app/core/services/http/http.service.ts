import { Injectable } from '@angular/core';
import { AppConfigService } from '../app-config/app-config.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { defer, Observable } from "rxjs";
import { urlJoin } from '../../../../../node_modules/url-join-ts';

export class HttpRequestContext {
  url: string = "" ;
  body?: any = {} ;
  params?: HttpParams;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private readonly baseUrl: string; 
  
  constructor(
    private readonly config: AppConfigService,
    private readonly httpClient: HttpClient
  ) { 
    this.baseUrl = this.config.baseUrl;
  }

  public get(context: HttpRequestContext){
    return defer(() => {
      const httpOptions = this.setHttpOptions(context.params);
      const url = urlJoin(this.baseUrl, context.url);
      return this.httpClient.get<any>(url, httpOptions);
    });
  }


  public post(context: HttpRequestContext): Observable<any> {
    return defer(() => {
      const httpOptions = this.setHttpOptions(context.params);
      const url = urlJoin(this.baseUrl, context.url);
      return this.httpClient.post<any>(url, context.body ?? {}, httpOptions);
    });
  }

  public delete(context: HttpRequestContext): Observable<any> {
    return defer( () =>{
      const httpOptions = this.setHttpOptions(context.params, context.body);
      const url = urlJoin(this.baseUrl, context.url);
      return this.httpClient.delete<any>(url, httpOptions);
    });
  }

  private setHttpOptions(params?: HttpParams, body?: any): Object{
    return  { 
        headers: new HttpHeaders({
          'Content-Type': 'application/json; charset=utf-8'
        }),
        params: params,
        observe: 'response',
        body: body
    };
  }
}