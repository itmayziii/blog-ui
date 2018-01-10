import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from "../../environments/environment";
import { UserService } from "../services/user.service";

@Injectable()
export class JsonapiInterceptor implements HttpInterceptor {
    private excludedRoutes: string[] = [
        '/v1/authenticate',
        '/v1/token-validation'
    ];

    public constructor(private userService: UserService) {

    }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.excludedRoutes.includes(request.url)) {
            return next.handle(request);
        }

        let jsonApiHeaders = new HttpHeaders({
            "Content-Type": "application/vnd.api+json",
            "Accept": "application/vnd.api+json"
        });

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