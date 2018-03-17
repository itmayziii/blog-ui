import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WithCredentialsInterceptor implements HttpInterceptor {
    public constructor() {

    }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const requestClone: HttpRequest<any> = request.clone({
            withCredentials: true
        });

        return next.handle(requestClone);
    }
}