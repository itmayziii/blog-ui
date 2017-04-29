import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class JsonApiService {

    constructor(private http: Http) {}

    public get() {
        console.log(environment.apiVersion);
        // Get the config url and use it to make the request
        // use specified model to make request
        // format that model to a angular model
    }
}
