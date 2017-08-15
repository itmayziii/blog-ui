import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs } from '@angular/http';
import { environment } from '../../../environments/environment';
import { Headers } from "@angular/http";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class JsonApiService {
    private baseUri = `${environment.apiUri}/${environment.apiVersion}`;

    constructor(private http: Http) {}

    public get(url: string) {
        this.http.get(`${environment.apiVersion}/${url}`).subscribe((results) => {
            console.log(results);
        });
    }

    public post(url: string, body: any, requestOptions?: RequestOptionsArgs): Promise<object> {
        requestOptions = (requestOptions || {});
        requestOptions.headers = new Headers({
            "Content-Type": "application/vnd.api+json",
            "Accept": "application/vnd.api+json"
        });
        return this.http.post(`v1/${url}`, body, requestOptions).toPromise();
    }
}
