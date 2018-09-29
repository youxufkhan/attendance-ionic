
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
        user:'user',
        user_create: 'user/create',
        user_login: 'user/login',
        user_approve:'user/approve',
        user_disapprove:'user/disapprove',
    }

    constructor(protected http: HttpClient) {
    }
    
    get urlWithExpand () {
        return `${this.url}&expand=${this.expands}`
    }
    
    public Create($model){
        $model.status = $model.status ? 1 : 0
        return this.http.post<any>(`${this.baseUrl}${this.url}/create`,$model)
        .map((response: Response) => {
            return response.json();
        });
    }

    public View(id){
        return this.http.get<any>(`${this.baseUrl}${this.url}/view&id=${id}&expand=${this.expands}`).map(
            (response)=>{
                return response;
            }
        )
    }

    public Update($model){
        $model.status = $model.status ? 1 : 0
        return this.http.put<any>(`${this.baseUrl}${this.url}/update&id=${$model.id}`,$model)
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

    public List(page=1,per_page=10,filters:any = null){
        var query = '';
        if (filters != null){
            for(var filter in filters){
            if(filters[filter]){
                query += `&${filter}=${ encodeURIComponent(filters[filter])}`
            }
        };
        }
        return this.http.get(`${this.baseUrl}${this.url}&expand=${this.expands}&per-page=${per_page}&page=${page}${query}`).map(
            (response)=>{
                return response;
            }
        )
    }


}