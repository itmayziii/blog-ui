import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from "../../environments/environment";

@Injectable()
export class JsonapiInterceptor implements HttpInterceptor {
    private excludedRoutes: string[] = [
        'authenticate',

    ];

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.excludedRoutes.indexOf(request.url) > 0) {
            return next.handle(request);
        }

        const jsonApiHeaders = new HttpHeaders({
            "Content-Type": "application/vnd.api+json",
            "Accept": "application/vnd.api+json",

        });

        const requestClone: HttpRequest<any> = request.clone({
            url: `${environment.apiUri}/${environment.apiVersion}/${request.url}`,
            headers: jsonApiHeaders
        });

        return next.handle(requestClone);
    }
}