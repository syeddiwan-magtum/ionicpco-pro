
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiConstantProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiConstantProvider {

  constructor() {
    console.log('Hello ApiConstantProvider Provider');    
  }
  public static API_PREFIX_PATH: string = "http://localhost:3001";

  public static LOGIN_CHECK: string = ApiConstantProvider.API_PREFIX_PATH + "/auth/login";
  public static USER_LIST: string = ApiConstantProvider.API_PREFIX_PATH + "/users";

  public static RFP_LIST: string = ApiConstantProvider.API_PREFIX_PATH + "/rfps";
  public static RFP_ADD: string = ApiConstantProvider.API_PREFIX_PATH + "/rfps";
  public static RFP_UPDATE: string = ApiConstantProvider.API_PREFIX_PATH + "/rfps/{{id}}";
  public static PROJECT_LIST: string = ApiConstantProvider.API_PREFIX_PATH + "/projects";


}
