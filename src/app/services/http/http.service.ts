import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers, Response } from "@angular/http";
import { environment } from "../../../environments/environment";

@Injectable()
export class HttpService {
    protected baseUri = `${environment.apiUri}/${environment.apiVersion}`;
    protected headers: Headers = new Headers();

    public constructor(protected http: Http) { }

    public get(url: string, requestOptions?: RequestOptionsArgs) {
        requestOptions = this.prepareRequestOptions(requestOptions);
        return this.http.get(`${environment.apiVersion}/${url}`, requestOptions).toPromise();
    }

    public post(url: string, body: any, requestOptions?: RequestOptionsArgs): Promise<object> {
        requestOptions = this.prepareRequestOptions(requestOptions);
        return new Promise((resolve, reject) => {
            this.http.post(`v1/${url}`, body, requestOptions).toPromise()
                .then((results: Response) => {
                    resolve(results.json());
                })
                .catch((error: Response) => {
                    reject(error.json());
                });
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
        for (let headerName in headers) {
            requestOptions.headers.set(headerName, headers[headerName]);
        }
        return requestOptions.headers;
    }
}
