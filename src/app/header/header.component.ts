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
                        <li *ngFor="let rightLink of leftLinks" class="nav-item">
                            <a routerLink="{{rightLink.path}}"
                               (click)="toggleNavigationMenu()"
                               routerLinkActive="active"
                               class="nav-link"
                               *ngIf="rightLink.condition()"
                            >{{rightLink.title}}</a>
                        </li>
                    </ul>
                </div>

                <div class="collapse navbar-collapse" [class.show]="!isNavigationCollapsed">
                    <ul class="navbar-nav ml-auto">
                        <li *ngFor="let leftLink of rightLinks" class="nav-item">
                            <a routerLink="{{leftLink.path}}"
                               (click)="toggleNavigationMenu()"
                               routerLinkActive="active"
                               class="nav-link"
                               *ngIf="leftLink.condition()"
                            >{{leftLink.title}}</a>
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
        {title: 'Blog', path: '/blogs', condition: () => {return true}},
        {title: 'Contact', path: '/contacts/create', condition: () => {return true}}
    ];
    public rightLinks: Array<NavLink> = [
        {title: 'Login', path: '/users/login', condition: () => {return !this.userService.isLoggedIn()}},
        {title: 'Register', path: '/users/register', condition: () => {return !this.userService.isLoggedIn()}},
        {
            title: 'Logout', path: '/users/logout', condition: () => {
            return this.userService.isLoggedIn();
        }
        }
    ];

    public constructor(private userService: UserService) {}

    public toggleNavigationMenu() {
        this.isNavigationCollapsed = !this.isNavigationCollapsed;
    }
}
