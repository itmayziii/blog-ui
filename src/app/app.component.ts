import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from "@angular/router";
import { filter } from "rxjs/operators";
import { WindowRef } from "./globals/window-ref";
import { GoogleAnalyticsService } from "./services/google-analytics.service";
import { AuthService } from "./services/auth.service";

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

    public constructor(private router: Router,
                       private windowRef: WindowRef,
                       private googleAnalyticsService: GoogleAnalyticsService,
                       private authService: AuthService) {

    }

    public ngOnInit(): void {
        this.authService.checkLogin();
        this.respondToNavigationEnd();
    }

    private respondToNavigationEnd() {
        this.router.events.pipe(
            filter((event) => {
                return event instanceof NavigationEnd;
            })
        ).subscribe((event: RouterEvent) => {
            this.googleAnalyticsService.pageView();
            this.windowRef.nativeWindow.document.body.scrollTop = 0;
        });
    }
}
