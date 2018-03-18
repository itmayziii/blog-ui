import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { WindowRef } from "../globals/window-ref";
import { isPlatformBrowser } from '@angular/common';
import { Request } from 'express';

declare var gtag: Function;

@Injectable()
export class GoogleAnalyticsService {
    public constructor(private windowRef: WindowRef, @Inject(PLATFORM_ID) private platformId: Object) {

    }

    public pageView() {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        const page = this.windowRef.nativeWindow.location.pathname + this.windowRef.nativeWindow.location.search;
        gtag('config', 'UA-115098281-1', {"page_path": page});
    }
}