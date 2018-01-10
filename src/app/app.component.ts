import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from "@angular/router";
import { filter } from "rxjs/operators";
import { WindowRef } from "./globals/window-ref";

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

    public constructor(private router: Router, private windowRef: WindowRef) {

    }

    public ngOnInit(): void {
        this.router.events.pipe(
            filter((event) => {
                return event instanceof NavigationEnd;
            })
        ).subscribe((event: RouterEvent) => {
            this.windowRef.nativeWindow.document.body.scrollTop = 0;
        });
    }
}
