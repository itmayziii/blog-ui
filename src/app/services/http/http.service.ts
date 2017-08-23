import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers, Response } from "@angular/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { Router } from "@angular/router";

@Injectable()
export class HttpService {
    protected baseUri = `${environment.apiUri}/${environment.apiVersion}`;
    protected headers: Headers = new Headers({'Content-Type': 'JSON'});

    public constructor(protected http: Http, protected router: Router) { }

    public get(url: string, requestOptions?: RequestOptionsArgs): Observable<any> {
        requestOptions = this.prepareRequestOptions(requestOptions);
        return this.http.get(`${this.baseUri}/${url}`, requestOptions)
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: Response) => {
                return this.handleError(error, 'GET');
            });
    }

    public post(url: string, body: any, requestOptions?: RequestOptionsArgs): Observable<any> {
        requestOptions = this.prepareRequestOptions(requestOptions);
        return this.http.post(`${this.baseUri}/${url}`, body, requestOptions)
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: Response) => {
                return this.handleError(error, 'POST');
            });
    }

    protected prepareRequestOptions(requestOptions: RequestOptionsArgs): RequestOptionsArgs {
        requestOptions = (requestOptions || {});

        if (requestOptions.headers) {
            requestOptions.headers = this.addHeaders(requestOptions, this.headers)
        } else {
            requestOptions.headers = this.headers;
        }

        return requestOptions;
    }

    private addHeaders(requestOptions: RequestOptionsArgs, headers: Headers): Headers {
        for (let headerName of requestOptions.headers.keys()) {
            headers.set(headerName, requestOptions.headers.get(headerName));
        }
        return headers;
    }

    private handleError(error: Response, requestMethod: string): Observable<any> {
        console.error(`There was a problem making a ${requestMethod} request to URL: ${error.url}`, error);

        if (error.status === 401 && this.router.url !== '/users/login') {
            return Observable.of(this.router.navigate(['/users/login']));
        } else {
            // Letting the error pass through to be handled on a per case basis
            return Observable.throw(error.json());
        }
    }
}
