import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class UserService  extends BaseService {

    public url = this.Urls.user_create;
    public expands = "";

    constructor( http: HttpClient) {
        super(http);
      }

    public createUser(user){
        return this.http.post(`${this.baseUrl}${this.Urls.user_create}`,user)
        .map(res => {
          return res;
        });
    }
    

    public login(user){
        return this.http.post(`${this.baseUrl}${this.Urls.user_login}`,user)
        .map(res => {
          return res;
        });
    }
    


}