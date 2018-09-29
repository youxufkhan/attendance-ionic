import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class UserService  extends BaseService {

    public url = this.Urls.user;
    public expands = "";

    constructor( http: HttpClient) {
        super(http);
      }

    public createUser(user){
        return this.http.post<any>(`${this.baseUrl}${this.Urls.user_create}`,user)

    }
    

    public login(user){
        return this.http.post<any>(`${this.baseUrl}${this.Urls.user_login}`,user)
        
    }
    
    public approve(userID){
        return this.http.get<any>(`${this.baseUrl}${this.Urls.user_approve}&user_id=${userID}`)
        
    }
    public disapprove(userID){
        return this.http.get<any>(`${this.baseUrl}${this.Urls.user_disapprove}&user_id=${userID}`)
        
    }


}