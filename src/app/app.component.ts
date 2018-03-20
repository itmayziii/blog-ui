import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from "@angular/router";
import { WindowRef } from "./globals/window-ref";
import { GoogleAnalyticsService } from "./services/google-analytics.service";
import { AuthService } from "./services/auth.service";
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'blog-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public notificationOptions = {
        position: ["bottom", "left"],
        timeOut: 5000,
        lastOnBottom: true,
        theClass: 'bg-primary'
    };
    public isLoading: boolean = false;

    public constructor(private router: Router,
                       private windowRef: WindowRef,
                       private googleAnalyticsService: GoogleAnalyticsService,
                       private authService: AuthService,
                       @Inject(PLATFORM_ID) private platformId: Object) {

    }

    public ngOnInit(): void {
        this.authService.checkLogin();
        this.respondToNavigation();
    }

    private respondToNavigation(): void {
        this.router.events.subscribe((routerEvent: RouterEvent) => {
            if (routerEvent instanceof NavigationStart) {
                this.respondToNavigationStart();
            }

            if (routerEvent instanceof NavigationEnd) {
                this.respondToNavigationEnd();
            }

            if (routerEvent instanceof NavigationCancel) {
                this.respondToNavigationCancel();
            }

            if (routerEvent instanceof NavigationError) {
                this.respondToNavigationError();
            }
        });
    }

    private respondToNavigationStart(): void {
        this.isLoading = true;
    }

    private respondToNavigationEnd(): void {
        this.isLoading = false;

        if (isPlatformBrowser(this.platformId)) {
            this.googleAnalyticsService.pageView();
            this.windowRef.nativeWindow.document.body.scrollTop = 0;
        }
    }

    private respondToNavigationCancel(): void {
        this.isLoading = false;
    }

    private respondToNavigationError(): void {
        this.isLoading = false;
    }
}
