import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { RouteService } from "../services/route.service";
import { HttpService } from "../services/http/http.service";
import { Headers } from "@angular/http";

@Injectable()
export class AuthGuard implements CanActivate {

    public constructor(private router: Router, private routeService: RouteService, private httpService: HttpService) {
    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return this.checkLogin(state);
    }

    private checkLogin(state: RouterStateSnapshot): Promise<boolean> {
        return new Promise((resolve) => {
            const apiToken = localStorage.getItem('API-Token');

            if (!apiToken) {
                this.routeService.redirectUrl = state.url;
                this.router.navigate(['/users/login']).then(() => {});
                resolve(false);
            }

            const headers = new Headers({
                "API-Token": apiToken
            });
            this.httpService.get('token-validation', {headers}).subscribe(
                (results: any) => {
                    resolve(true);
                },
                (error: any) => {
                    this.routeService.redirectUrl = state.url;
                    this.router.navigate(['/users/login']).then(() => {});
                    resolve(false);
                }
            );
        });
    }
}
