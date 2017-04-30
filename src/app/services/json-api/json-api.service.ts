import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class JsonApiService {

    constructor(private http: Http) {}

    public get(model: string) {
        this.http.get(`${environment.apiVersion}/${model}`).subscribe((results) => {
            console.log(results);
        });

        // Get the config url and use it to make the request
        // use specified model to make request
        // format that model to a angular model
    }

    public post(model: string, body: object): Promise<object> {
        console.log(body);
        console.log(`${environment.apiVersion}/${model}`);
        return this.http.post(`${environment.apiVersion}/${model}`, body).toPromise();
    }
}
