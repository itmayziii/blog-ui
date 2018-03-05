import { Injectable } from "@angular/core";
import { WindowRef } from "../globals/window-ref";

declare var gtag: Function;

@Injectable()
export class GoogleAnalyticsService {
    public constructor(private windowRef: WindowRef) {

    }

    public pageView() {
        const page = this.windowRef.nativeWindow.location.pathname + this.windowRef.nativeWindow.location.search;
        gtag('config', 'UA-115098281-1', {"page_path": page});
    }
}