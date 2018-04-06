import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavLink } from '../models/nav-link';
import { UserService } from '../services/user.service';
import { LoadingService } from '../services/loading.service';
import { ISubscription } from 'rxjs/Subscription';

@Component({
    selector: 'blog-header',
    template: `
        <nav class="navbar navbar-expand-md navbar-dark fixed-top">

            <span *ngIf="isAppLoading" class="navbar-brand navbar-brand--loading"><blog-loader size="1.2rem"></blog-loader></span>
            <a *ngIf="!isAppLoading" class="navbar-brand text-success" routerLink="/">FHD</a>

            <button (click)="swapTogglerIcon()" class="navbar-toggler ml-auto" type="button" data-toggle="collapse"
                    data-target="#navbarItems"
                    aria-controls="navbarItems"
                    aria-label="Toggle navigation"><i #navbarToggler class="fa fa-bars navbar-toggler-hamburger" aria-hidden="true"></i>
            </button>

            <div class="collapse navbar-collapse mt-2 mt-md-0 text-center" id="navbarItems">
                <ul class="navbar-nav mr-auto">
                    <li *ngFor="let leftLink of leftLinks" class="nav-item">
                        <a routerLink="{{ leftLink.path }}"
                           routerLinkActive="active"
                           class="nav-link"
                           *ngIf="leftLink.condition()"
                        >{{leftLink.title}}</a>
                    </li>
                </ul>

                <ul class="navbar-nav ml-auto">
                    <li *ngFor="let rightLink of rightLinks" class="nav-item">
                        <a routerLink="{{ rightLink.path }}"
                           routerLinkActive="active"
                           class="nav-link"
                           *ngIf="rightLink.condition()"
                        >{{ rightLink.title }}</a>
                    </li>
                </ul>
            </div>
        </nav>
    `,
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
    @ViewChild('navbarToggler') public navbarToggler: ElementRef;

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

    public swapTogglerIcon() {
        const isClosed = this.navbarToggler.nativeElement.classList.contains('fa-bars');
        if (isClosed) {
            this.navbarToggler.nativeElement.classList.remove('fa-bars');
            this.navbarToggler.nativeElement.classList.add('fa-times');
            return;
        }

        this.navbarToggler.nativeElement.classList.remove('fa-times');
        this.navbarToggler.nativeElement.classList.add('fa-bars');
    }

    private listenToAppLoading() {
        this.isAppLoadingSubscription = this.loadingService.isLoading$.subscribe((isLoading: boolean) => {
            this.isAppLoading = isLoading;
        });
    }
}
