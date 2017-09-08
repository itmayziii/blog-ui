import { Injectable } from '@angular/core';
import { HttpService } from "./http/http.service";
import { Headers } from "@angular/http";

@Injectable()
export class AuthService {

    public constructor(private httpService: HttpService) { }

    public checkLogin(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const apiToken = localStorage.getItem('API-Token');
            if (!apiToken) {
                console.log('AuthService checkLogin() no api token resolve(false');
                resolve(false);
                return;
            }

            const headers = new Headers({
                "API-Token": apiToken
            });
            this.httpService.get('token-validation', {headers}).subscribe(
                (results: any) => {
                    const isTokenValid = results.hasOwnProperty('valid');
                    if (!isTokenValid) {
                        localStorage.removeItem('API-Token');
                    }

                    resolve(isTokenValid);
                },
                (error: any) => {
                    localStorage.removeItem('API-Token');
                    reject(false);
                }
            );
        });
    }

}