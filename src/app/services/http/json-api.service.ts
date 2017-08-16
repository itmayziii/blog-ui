import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from "@angular/http";
import 'rxjs/add/operator/toPromise';
import { HttpService } from "./http.service";

@Injectable()
export class JsonApiService extends HttpService {
    protected headers: Headers = new Headers({
        "Content-Type": "application/vnd.api+json",
        "Accept": "application/vnd.api+json"
    });

    constructor(protected http: Http) {
        super(http);
    }
}
