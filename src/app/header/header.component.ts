import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavLink } from "../models/nav-link";

@Component({
    selector: 'app-header',
    template: `
        <header class="header">
            <nav class="navbar navbar-toggleable-md sticky-top navbar-light">
                <button class="navbar-toggler navbar-toggler-right" type="button" (click)="toggleNavigationMenu()">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <a class="navbar-brand" href="#">
                    Placeholder
                </a>

                <div class="collapse navbar-collapse" [class.show]="!navbarCollapsed">
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

                <div class="collapse navbar-collapse" [class.show]="!navbarCollapsed">
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
    public navbarCollapsed: boolean = true;
    public leftLinks: Array<NavLink> = [
        {title: 'Blog', path: '/blog',},
        {title: 'Contact', path: '/contacts/create'}
    ];
    public rightLinks: Array<NavLink> = [
        {title: 'Login', path: '/users/login', condition: () => !this.isUserLoggedIn()},
        {title: 'Register', path: '/users/register', condition: () => !this.isUserLoggedIn()},
        {
            title: 'Logout',
            path: '/users/logout',
            condition: this.isUserLoggedIn
        }
    ];


    public toggleNavigationMenu() {
        this.navbarCollapsed = !this.navbarCollapsed;
    }

    public isUserLoggedIn(): boolean {
        return (localStorage.getItem('API-Token')) ? true : false;
    }
}
