import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import * as moment from "moment";

@Injectable()
export class AuthGuard implements CanActivate {

    public constructor(private router: Router) {
    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        console.log(route);
        console.log(state);
        return this.checkLogin();
    }

    private checkLogin(): Promise<boolean> {
        console.log('checking login');
        return new Promise((resolve) => {
            const apiToken = localStorage.getItem('API-Token');
            const apiTokenExpiration = localStorage.getItem('API-Token-Expiration');
            if (!apiToken || !apiTokenExpiration || this.isApiTokenExpired(apiTokenExpiration)) {
                this.router.navigate(['/users/login']).then(() => {});
                resolve(false);
            }

            resolve(true);
        });
    }

    //noinspection JSMethodCanBeStatic
    private isApiTokenExpired(apiTokenExpiration: string): boolean {
        const now = moment();
        const apiTokenExpirationDate = moment(apiTokenExpiration, 'MM-DD-YYYY HH-mm-ss');
        if (!apiTokenExpirationDate.isValid()) {
            return true;
        }

        return now.isAfter(apiTokenExpirationDate);
    }
}
