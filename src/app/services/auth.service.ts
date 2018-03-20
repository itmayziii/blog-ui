import { Injectable } from '@angular/core';
import { JsonApiError } from "../models/json-api/json-api-error";
import { JsonApiResource } from "../models/json-api/json-api-resource";
import { UserService } from "./user.service";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user";

@Injectable()
export class AuthService {

    public constructor(private httpClient: HttpClient, private userService: UserService) {
    }

    public checkLogin(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.httpClient.get('token-validation')
                .subscribe(
                    (results: JsonApiResource<User>) => {
                        this.userService.user = results.data;
                        resolve(true);
                    },
                    (error: JsonApiError) => {
                        this.userService.user = null;
                        resolve(false);
                    }
                );
        });
    }

}