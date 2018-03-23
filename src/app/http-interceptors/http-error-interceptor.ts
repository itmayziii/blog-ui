import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).do(
            (event) => {},
            (errorEvent: HttpErrorResponse) => {
                // console.info(`HttpErrorInterceptor: Failed to make a ${request.method} request to ${request.urlWithParams}, with response`, errorEvent);
            });
    }
}