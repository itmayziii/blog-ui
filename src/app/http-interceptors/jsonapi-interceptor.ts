import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from "../../environments/environment";
import { UserService } from "../services/user.service";

@Injectable()
export class JsonapiInterceptor implements HttpInterceptor {
    public constructor(private userService: UserService) {

    }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let jsonApiHeaders = request.headers;

        jsonApiHeaders = jsonApiHeaders.set('Content-Type', 'application/json');
        jsonApiHeaders = jsonApiHeaders.set('Accept', 'application/vnd.api+json');

        const userApiToken = this.userService.getUserToken();
        if (userApiToken) {
            jsonApiHeaders = jsonApiHeaders.set('API-Token', userApiToken);
        }

        const requestClone: HttpRequest<any> = request.clone({
            url: `${environment.apiUri}/${environment.apiVersion}/${request.url}`,
            headers: jsonApiHeaders
        });

        return next.handle(requestClone);
    }
}