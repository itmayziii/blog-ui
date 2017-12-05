import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";

@Injectable()
export class RouteService {
    private _redirectUrl: string;

    public constructor(private router: Router) {
    }

    public get redirectUrl(): string {
        return this._redirectUrl;
    }

    public set redirectUrl(value: string) {
        this._redirectUrl = value;
    }

    public routeNavigationStart(): Observable<NavigationEnd> {
        return this.router.events
            .filter((event) => {
                return event instanceof NavigationEnd
            });
    }
}
