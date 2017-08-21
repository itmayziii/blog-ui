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
        return this.http
            .get(`${this.baseUri}/${url}`, requestOptions)
            .map((response: Response) => {
                response.json();
            })
            .catch((error: Response) => {
                console.log('IN AN ERROR');
                return this.handleError(error);
            });
    }

    // public post(url: string, body: any, requestOptions?: RequestOptionsArgs): Promise<object> {
    //     requestOptions = this.prepareRequestOptions(requestOptions);
    //     return new Promise((resolve, reject) => {
    //         this.http.post(`v1/${url}`, body, requestOptions).toPromise()
    //             .then((results: Response) => {
    //                 resolve(results.json());
    //             })
    //             .catch((error: Response) => {
    //                 reject(error.json());
    //             });
    //     });
    // }

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
        for (let headerName of headers.keys()) {
            console.log(headerName);
            requestOptions.headers.set(headerName, headers.get(headerName));
        }
        return requestOptions.headers;
    }

    private handleError(error: Response): Observable<any> {
        console.error(`There was a problem making a GET request to URL:`, error);

        if (error.status === 401 && this.router.url !== '/users/login') {
            console.log('abc');
            this.router.navigate(['/users/login']).then(() => {});
        } else {
            // Letting the error pass through to be handled on a per case basis
            console.log('def');
            return Observable.throw(error);
        }
    }
}
