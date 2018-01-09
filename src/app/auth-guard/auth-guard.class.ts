import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { RouteService } from "../services/route.service";
import { UserService } from "../services/user.service";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
    public constructor(private authService: AuthService,
                       private router: Router,
                       private routeService: RouteService,
                       private userService: UserService) {}

    public canActivate(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Promise<boolean> {
        return this.verifyAccess(route, routerState.url);
    }

    public canActivateChild(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Promise<boolean> {
        return this.verifyAccess(route, routerState.url);
    }

    public canLoad(route: Route): Promise<boolean> {
        return this.verifyAccess(route, route.path)
    }

    private verifyAccess(routeSnapshot: ActivatedRouteSnapshot | Route, url: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.authService.checkLogin()
                .then((isLoggedIn: boolean) => {
                    if (!isLoggedIn) {

                        if (this.isGuestRoute(routeSnapshot)) {
                            resolve(true);
                        } else {
                            this.navigateToLogin(url);
                            resolve(false);
                        }

                    }

                    if (this.hasAccess(routeSnapshot)) {
                        resolve(true);
                        return;
                    } else {
                        this.router.navigate(['/access-denied']).then(() => {});
                        resolve(false);
                    }
                })
                .catch(() => {
                    reject(false);
                });
        });
    }

    private navigateToLogin(redirectUrl: string): void {
        this.routeService.redirectUrl = redirectUrl;
        this.router.navigate(['/users/login']).then(() => {});
    }

    private hasAccess(route: ActivatedRouteSnapshot | Route): boolean {
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

    private isGuestRoute(route: ActivatedRouteSnapshot | Route): boolean {
        if (!route.data || !route.data.authorizedRole) {
            return false;
        }

        return route.data.authorizedRole === 'Guest';
    }
}
