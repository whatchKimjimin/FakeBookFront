import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Response, Headers, RequestOptionsArgs, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class HttpService {
  headerInfo: Headers;
  reqOptions: RequestOptionsArgs = {};

  // backend service domain
  defaultUrl = environment.backendUrl;

  constructor( private http: Http ) {
    this.headerInfo = new Headers( { 'Content-Type': 'application/json'} );
    this.reqOptions.headers = this.headerInfo;
  }

  sendGet( uri: string ): Observable<any> {
    return this.http.get( this.defaultUrl + uri, this.reqOptions )
      .map( response => response.json() )
      .catch( this.handleError );
  }

  sendPost( uri: string, dto: any ): Observable<any> {
    return this.http.post( this.defaultUrl + uri, dto, this.reqOptions )
      .map( response => response.json() )
      .catch( this.handleError );
  }

  sendDelete( uri: string , id: number): Observable<any> {
    return this.http.delete(this.defaultUrl + uri + id, this.reqOptions)
      .map( response => response.json() )
      .catch( this.handleError );
  }

  sendPut( uri: string , dto: any): Observable<any> {
    return this.http.put(this.defaultUrl + uri, dto, this.reqOptions)
      .map( response => response.json() )
      .catch( this.handleError );
  }

  private handleError( error: Response | any ) {
    return Observable.throw( error.status );
  }

}
