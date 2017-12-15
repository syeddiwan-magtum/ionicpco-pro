import { Http, Headers,  RequestOptionsArgs} from '@angular/http';
import { Injectable } from '@angular/core';
import { ApiConstantProvider } from '../../providers/api-constant/api-constant';
import { Observable } from 'rxjs/Rx';




/*
  Generated class for the RfbServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RfbServiceProvider {

  constructor(public http: Http) {
    console.log('Hello RfbServiceProvider Provider');
  }

  public api_token: string = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1MTMwNzY0Njl9.ajBXdHJATqY-w3EYs6u78S0VyzQeHzLtB7XXUVdH03k';
  public userInfo: any = null;

  
  private headers: Headers = new Headers({});
  private requestOptionArgs: RequestOptionsArgs = {};

  resetHeader(skip_api_token: boolean = true)
  {

    this.headers = new Headers({
      'Content-Type': 'application/json', 'Access-Control-Allow-Origin': ApiConstantProvider.API_PREFIX_PATH
    });
    if (skip_api_token)
    {
      this.headers.set('Authorization', this.userInfo.auth_token);
    }
    this.requestOptionArgs = {};
    this.requestOptionArgs.headers = this.headers;
      
  }

  login(data): Observable<any> {
    this.resetHeader(false);
    return this.http
         .post(ApiConstantProvider.LOGIN_CHECK, JSON.stringify(data), this.requestOptionArgs);
  }

  getProjectList(data): Observable<any> {

    this.resetHeader();
    this.requestOptionArgs.search = data;
    console.log('msg in getProjectList', ApiConstantProvider.RFP_LIST);
    return this.http.get(ApiConstantProvider.PROJECT_LIST, this.requestOptionArgs);

  }

  getUserList(data): Observable<any> {

    this.resetHeader();
    this.requestOptionArgs.search = data;
    console.log('msg in getProjectList', ApiConstantProvider.USER_LIST);
    return this.http.get(ApiConstantProvider.USER_LIST, this.requestOptionArgs);

  }

  getList(data): Observable<any> {

    this.resetHeader();       
    this.requestOptionArgs.search = data;
    console.log(data);
    return this.http.get(ApiConstantProvider.RFP_LIST, this.requestOptionArgs);
   
  }
  saveRfp(data): Observable<any>  {
    this.resetHeader(); 
    return this.http
      .post(ApiConstantProvider.RFP_ADD, JSON.stringify(data), this.requestOptionArgs);
  }

  updateRfp(id:string, data:any): Observable<any>  {
    this.resetHeader();       
    let rtp_edit_url = ApiConstantProvider.RFP_UPDATE.replace('{{id}}', id);
    return this.http
      .put(rtp_edit_url, JSON.stringify(data), this.requestOptionArgs);
  }

  /*
  private handleError(error: any): any {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  */



}
