import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { RouteService } from "../services/route.service";
import { Observable } from "rxjs/Observable";
import { UserService } from "../services/user.service";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    public constructor(
        private authService: AuthService,
        private router: Router,
        private routeService: RouteService,
        private userService: UserService) {}

    public canActivate(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Promise<boolean> {
        return this.verifyAccess(route, routerState);
    }

    public canActivateChild(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Promise<boolean> {
        return this.verifyAccess(route, routerState);
    }

    private verifyAccess(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.authService.checkLogin()
                .then((isLoggedIn: boolean) => {
                    if (!isLoggedIn) {

                        if (this.isGuestRoute(route)) {
                            resolve(true);
                        } else {
                            this.navigateToLogin(routerState);
                            resolve(false);
                        }

                    }

                    if (this.hasAccess(route)) {
                        resolve(true);
                        return;
                    }

                    resolve(false);
                })
                .catch(() => {
                    reject(false);
                });
        });
    }

    private navigateToLogin(routerState: RouterStateSnapshot): void {
        this.routeService.redirectUrl = routerState.url;
        this.router.navigate(['/users/login']).then(() => {});
    }

    private hasAccess(route: ActivatedRouteSnapshot): boolean {
        if (!route.data || !route.data.authorizedRole) {
            console.error('Role information not set for route', route);
            return false;
        }

        const currentUserRole: string = this.userService.userRole();
        const roleTree = [
            'Guest',
            'Standard',
            'Administrator'
        ];

        const currentUserAccessLevel: number = roleTree.indexOf(currentUserRole);
        if (currentUserAccessLevel === -1) {
            return false;
        }

        const routeAccessLevel: number = roleTree.indexOf(route.data.authorizedRole);
        return (currentUserAccessLevel >= routeAccessLevel);
    }

    private isGuestRoute(route: ActivatedRouteSnapshot): boolean {
        if (!route.data || !route.data.authorizedRole) {
            return false;
        }

        return route.data.authorizedRole === 'Guest';
    }
}
