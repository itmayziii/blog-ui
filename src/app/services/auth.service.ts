import { Injectable } from '@angular/core';
import { JsonApiError } from "../models/json-api/json-api-error";
import { JsonApiResource } from "../models/json-api/json-api-resource";
import { UserService } from "./user.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../models/user";

@Injectable()
export class AuthService {

    public constructor(private httpClient: HttpClient, private userService: UserService) {
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

            const headers: HttpHeaders = new HttpHeaders({
                "API-Token": apiToken
            });
            this.httpClient.get('token-validation', {headers})
                .subscribe(
                    (results: JsonApiResource<User>) => {
                        this.userService.user = results.data.attributes;
                        this.userService.userId = results.data.id;
                        resolve(true);
                    },
                    (error: JsonApiError) => {
                        localStorage.removeItem('API-Token');
                        this.userService.user = null;
                        this.userService.userId = null;
                        reject(false);
                    }
                );
        });
    }

}