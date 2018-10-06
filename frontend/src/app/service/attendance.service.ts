import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class AttendanceService  extends BaseService {

    public url = this.Urls.user;
    public expands = "";

    constructor( http: HttpClient) {
        super(http);
      }

    public timeIn(user_id){
        return this.http.get<any>(`${this.baseUrl}${this.Urls.time_in}&user_id=${user_id}`)

    }
    

    public timeOut(user_id){
        return this.http.get<any>(`${this.baseUrl}${this.Urls.time_out}&user_id=${user_id}`)
        
    }

    public viewAttendance(user_id){
        return this.http.get<any>(`${this.baseUrl}${this.Urls.user_attendance}&user_id=${user_id}`)
    }
    
    // public approve(userID){
    //     return this.http.get<any>(`${this.baseUrl}${this.Urls.user_approve}&user_id=${userID}`)
        
    // }
    // public disapprove(userID){
    //     return this.http.get<any>(`${this.baseUrl}${this.Urls.user_disapprove}&user_id=${userID}`)
        
    // }


}