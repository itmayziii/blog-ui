import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpService {
    private baseUri = `${environment.apiUri}/${environment.apiVersion}`;

    constructor(private http: Http) {}

    public get(url: string) {
        this.http.get(`${environment.apiVersion}/${url}`).subscribe((results) => {
            console.log(results);
        });
    }

    public post(model: string, body: object): Promise<object> {
        return this.http.post(`${this.baseUri}/${model}`, body).toPromise();
    }
}
