
import { HttpClient } from '@angular/common/http';
import {Response} from '@angular/http';

import 'rxjs/add/operator/map';
import { Injectable } from "@angular/core";

@Injectable()
export class BaseService {

    baseUrl = 'http://localhost/AttendanceApp/backend/web/index.php?r='
    public url = "";
    public expands = "";
    
    public Urls = {
        user_create: 'user/create',
        user_login: 'user/login'
    }

    constructor(protected http: HttpClient) {
    }
    
    get urlWithExpand () {
        return `${this.url}&expand=${this.expands}`
    }
    
    public Create($model){
        $model.status = $model.status ? 1 : 0
        return this.http.post(`${this.baseUrl}${this.url}/create`,$model)
        .map((response: Response) => {
            return response.json();
        });
    }

    public View(id){
        return this.http.get(`${this.baseUrl}${this.url}/view&id=${id}&expand=${this.expands}`).map(
            (response)=>{
                return response;
            }
        )
    }

    public Update($model){
        $model.status = $model.status ? 1 : 0
        return this.http.put(`${this.baseUrl}${this.url}/update&id=${$model.id}`,$model)
        .map((response: Response) => {
            return response.json();
        });
    }

    public Delete($model){
        return this.http.delete(`${this.baseUrl}${this.url}/delete&id=${$model.id}`,$model)
        .map((response) => {
            return response;
        });
    }


}