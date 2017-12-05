import { Injectable } from '@angular/core';
import { Headers } from "@angular/http";
import { JsonApiService } from "./http/json-api.service";
import { JsonApiError } from "../models/json-api/json-api-error";
import { JsonApiResource } from "../models/json-api/json-api-resource";
import { UserService } from "./user.service";

@Injectable()
export class AuthService {

    public constructor(private jsonApi: JsonApiService, private userService: UserService) {
    }

    public checkLogin(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const apiToken = localStorage.getItem('API-Token');
            if (!apiToken) {
                this.userService.user = null;
                this.userService.userId = null;
                resolve(false);
                return;
            }

            const headers = new Headers({
                "API-Token": apiToken
            });
            this.jsonApi.get('token-validation', {headers}, false).subscribe(
                (results: JsonApiResource) => {
                    const apiTokenExists = results.data.attributes.hasOwnProperty('api_token');
                    if (!apiTokenExists) {
                        localStorage.removeItem('API-Token');
                    }

                    this.userService.user = results.data.attributes;
                    this.userService.userId = results.data.id;
                    resolve(apiTokenExists);
                },
                (error: JsonApiError) => {
                    localStorage.removeItem('API-Token');
                    reject(false);
                }
            );
        });
    }

}