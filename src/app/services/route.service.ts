import { Injectable } from '@angular/core';

@Injectable()
export class RouteService {
    private _redirectUrl: string;

    get redirectUrl(): string {
        return this._redirectUrl;
    }

    set redirectUrl(value: string) {
        this._redirectUrl = value;
    }
}
