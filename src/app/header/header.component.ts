import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavLink } from '../models/nav-link';
import { UserService } from '../services/user.service';
import { LoadingService } from '../services/loading.service';
import { ISubscription } from 'rxjs/Subscription';

@Component({
    selector: 'blog-header',
    template: `
        <header class="header sticky-top">
            <nav class="navbar navbar-expand-md navbar-light py-0">

                <span *ngIf="isAppLoading" class="navbar-brand"><blog-loader size="1.2rem"></blog-loader></span>
                <a *ngIf="!isAppLoading" class="navbar-brand text-success" routerLink="/">FHD</a>

                <button class="navbar-toggler navbar-toggler-right" type="button" (click)="toggleNavigationMenu()">
                    <span class="navbar-toggler-icon"></span>
                </button>

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
export class HeaderComponent implements OnInit, OnDestroy {
    @ViewChild('collapsibleNav') public collapsibleNav: ElementRef;
    public isNavigationCollapsed: boolean = true;
    public isAppLoading: boolean = false;
    private isAppLoadingSubscription: ISubscription;
    public leftLinks: Array<NavLink> = [
        {
            title: 'Posts', path: '/posts', condition: () => {
                return true
            }
        },
        {
            title: 'Contact', path: '/contacts/create', condition: () => {
                return true
            }
        },
        {
            title: 'Categories', path: '/categories', condition: () => {
                return this.userService.isAdmin()
            }
        },
        {
            title: 'Files', path: '/files/upload', condition: () => {
                return this.userService.isAdmin()
            }
        }
    ];
    public rightLinks: Array<NavLink> = [
        {title: 'Login', path: '/users/login', condition: () => !this.userService.isLoggedIn()},
        {title: 'Register', path: '/users/register', condition: () => !this.userService.isLoggedIn()},
        {title: 'Logout', path: '/users/logout', condition: () => this.userService.isLoggedIn()}
    ];

    public constructor(private userService: UserService, private loadingService: LoadingService) {
    }

    public ngOnInit(): void {
        this.listenToAppLoading();
    }

    public ngOnDestroy(): void {
        if (this.isAppLoadingSubscription) {
            this.isAppLoadingSubscription.unsubscribe();
        }
    }

    public toggleNavigationMenu() {
        this.isNavigationCollapsed = !this.isNavigationCollapsed;
    }

    private listenToAppLoading() {
        this.isAppLoadingSubscription = this.loadingService.isLoading$.subscribe((isLoading: boolean) => {
            this.isAppLoading = isLoading;
        });
    }
}
