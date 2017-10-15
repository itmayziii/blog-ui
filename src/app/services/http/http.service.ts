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

    public constructor(protected http: Http, protected router: Router) {
    }

    public get(url: string, requestOptions?: RequestOptionsArgs, navigateIfAuthenticationNeeded: boolean = true): Observable<any> {
        requestOptions = this.prepareRequestOptions(requestOptions);
        return this.http.get(`${this.baseUri}/${url}`, requestOptions)
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: Response) => {
                let navigateToLogin: boolean = false;

                if (navigateIfAuthenticationNeeded) {
                    console.log('ERROR IS HERE', error);
                    navigateToLogin = error.status === 401;
                    console.log('NAVIGATETOLOGIN ', navigateToLogin);
                }

                return this.handleError(error, 'GET', navigateToLogin);
            });
    }

    public post(url: string, body: any, requestOptions?: RequestOptionsArgs, navigateIfAuthenticationNeeded: boolean = true): Observable<any> {
        requestOptions = this.prepareRequestOptions(requestOptions);
        return this.http.post(`${this.baseUri}/${url}`, body, requestOptions)
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: Response) => {
                let navigateToLogin: boolean = false;

                if (navigateIfAuthenticationNeeded) {
                    navigateToLogin = error.status === 401;
                }

                return this.handleError(error, 'POST', navigateToLogin);
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

    private handleError(error: Response, requestMethod: string, navigateToLogin: boolean = true): Observable<any> {
        console.error(`There was a problem making a ${requestMethod} request to URL: ${error.url}`, error);

        if (navigateToLogin) {
            this.router.navigate(['/users/login']);
        }

        return Observable.throw(error.json());
    }
}
