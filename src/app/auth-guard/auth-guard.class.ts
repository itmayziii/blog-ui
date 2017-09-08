import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { RouteService } from "../services/route.service";

@Injectable()
export class AuthGuard implements CanActivate {

    public constructor(private authService: AuthService, private router: Router, private routeService: RouteService,) {}

    public canActivate(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.authService.checkLogin()
                .then((isLoggedIn: boolean) => {
                    if (!isLoggedIn) {
                        this.navigateToLogin(routerState);
                        resolve(false);
                        return;
                    }

                    resolve(true);
                })
                .catch(() => {
                    this.navigateToLogin(routerState);
                    reject(false);
                });
        });
    }

    private navigateToLogin(routerState: RouterStateSnapshot) {
        this.routeService.redirectUrl = routerState.url;
        this.router.navigate(['/users/login']).then(() => {});
    }
}
