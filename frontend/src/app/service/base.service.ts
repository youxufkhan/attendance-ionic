
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

export class BaseService {

    baseUrl = 'http://localhost/basic/index.php?r='
    public url = "";
    public expands = "";
    
    public Urls = {
        user: 'user'
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
}