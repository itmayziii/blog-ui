import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavLink } from "../models/nav-link";
import { UserService } from "../services/user.service";

@Component({
    selector: 'app-header',
    template: `
        <header class="header">
            <nav class="navbar navbar-toggleable-md sticky-top navbar-light">
                <button class="navbar-toggler navbar-toggler-right" type="button" (click)="toggleNavigationMenu()">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <a class="navbar-brand" routerLink="/">TM3</a>

                <div class="collapse navbar-collapse" [class.show]="!isNavigationCollapsed">
                    <ul class="navbar-nav">
                        <li *ngFor="let link of leftLinks" class="nav-item">
                            <a routerLink="{{link.path}}"
                               (click)="toggleNavigationMenu()"
                               routerLinkActive="active"
                               class="nav-link"
                               *ngIf="(link.condition) ? link.condition() : true"
                            >{{link.title}}</a>
                        </li>
                    </ul>
                </div>

                <div class="collapse navbar-collapse" [class.show]="!isNavigationCollapsed">
                    <ul class="navbar-nav ml-auto">
                        <li *ngFor="let link of rightLinks" class="nav-item">
                            <a routerLink="{{link.path}}"
                               (click)="toggleNavigationMenu()"
                               routerLinkActive="active"
                               class="nav-link"
                               *ngIf="(link.condition) ? link.condition() : true"
                            >{{link.title}}</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    `,
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    @ViewChild('collapsibleNav') public collapsibleNav: ElementRef;
    public isNavigationCollapsed: boolean = true;
    public leftLinks: Array<NavLink> = [
        {title: 'Blog', path: '/blogs',},
        {title: 'Contact', path: '/contacts/create'}
    ];
    public rightLinks: Array<NavLink> = [
        {title: 'Login', path: '/users/login', condition: () => !this.userService.isLoggedIn()},
        {title: 'Register', path: '/users/register', condition: () => !this.userService.isLoggedIn()},
        {
            title: 'Logout',
            path: '/users/logout',
            condition: this.userService.isLoggedIn
        }
    ];

    public constructor(private userService: UserService) {}

    public toggleNavigationMenu() {
        this.isNavigationCollapsed = !this.isNavigationCollapsed;
    }
}
