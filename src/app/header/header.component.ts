import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavLink } from "../models/nav-link";

@Component({
    selector: 'app-header',
    template: `
        <header>
            <nav class="navbar navbar-toggleable-md sticky-top navbar-light bg-primary">
                <button class="navbar-toggler navbar-toggler-right" type="button" (click)="toggleNavigationMenu()">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <a class="navbar-brand" href="#">
                    Placeholder
                </a>

                <div class="collapse navbar-collapse" [class.show]="!navbarCollapsed">
                    <ul class="navbar-nav">
                        <li *ngFor="let link of links" class="nav-item">
                            <a routerLink="{{link.path}}" (click)="toggleNavigationMenu()" routerLinkActive="active" class="nav-link">{{link.title}}</a>
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
    public links: Array<NavLink> = [
        {title: 'Blog', path: '/blog'},
        {title: 'Contact', path: '/contacts/create'},
        {title: 'Login', path: '/users/login'}
    ];

    public toggleNavigationMenu() {
        this.navbarCollapsed = !this.navbarCollapsed;
    }
}
