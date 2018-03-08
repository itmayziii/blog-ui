import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

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
}
