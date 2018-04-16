import { Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
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

            <button #navbarToggler (click)="toggleNavbarCollapse()" class="navbar-toggler ml-auto" type="button" aria-controls="navbarItems"
                    aria-expanded="false"
                    aria-label="Toggle navigation"><i data-navbar-toggler class="fa fa-bars navbar-toggler-hamburger"
                                                      aria-hidden="true"></i>
            </button>

            <div #navbarCollapse class="navbar-collapse mt-2 mt-md-0 text-center" id="navbarItems">
                <ul class="navbar-nav mr-auto">
                    <li *ngFor="let leftLink of leftLinks" class="nav-item">
                        <a routerLink="{{ leftLink.path }}"
                           (click)="toggleNavbarCollapse()"
                           routerLinkActive="active"
                           class="nav-link"
                           *ngIf="leftLink.condition()"
                        >{{leftLink.title}}</a>
                    </li>
                </ul>

                <ul class="navbar-nav ml-auto">
                    <li *ngFor="let rightLink of rightLinks" class="nav-item">
                        <a routerLink="{{ rightLink.path }}"
                           (click)="toggleNavbarCollapse()"
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
    @ViewChild('navbarCollapse') public navbarCollapse: ElementRef;

    public isAppLoading: boolean = false;
    private isAppLoadingSubscription: ISubscription;
    public leftLinks: Array<NavLink> = [
        {
            title: 'Posts', path: '/posts', condition: () => true
        },
        {
            title: 'Contact', path: '/contacts/create', condition: () => true
        },
        {
            title: 'Pages', path: '/pages', condition: () => this.userService.isAdmin()
        },
        {
            title: 'Categories', path: '/categories', condition: () => this.userService.isAdmin()

        },
        {
            title: 'Files', path: '/files/upload', condition: () => this.userService.isAdmin()
        }
    ];
    public rightLinks: Array<NavLink> = [
        {title: 'Login', path: '/users/login', condition: () => !this.userService.isLoggedIn()},
        {title: 'Register', path: '/users/register', condition: () => !this.userService.isLoggedIn()},
        {title: 'Logout', path: '/users/logout', condition: () => this.userService.isLoggedIn()}
    ];

    public constructor(private userService: UserService, private loadingService: LoadingService, @Inject(PLATFORM_ID) private platformId: Object) {
    }

    public ngOnInit(): void {
        this.listenToAppLoading();
    }

    public ngOnDestroy(): void {
        if (this.isAppLoadingSubscription) {
            this.isAppLoadingSubscription.unsubscribe();
        }
    }

    public toggleNavbarCollapse() {
        this.navbarCollapse.nativeElement.classList.toggle('show');

        const navbarTogglerIcon = this.navbarToggler.nativeElement.querySelector('[data-navbar-toggler]');
        navbarTogglerIcon.classList.toggle('fa-bars');
        navbarTogglerIcon.classList.toggle('fa-times');

        const isClosed = navbarTogglerIcon.classList.contains('fa-bars');
        if (isClosed) {
            this.navbarToggler.nativeElement.setAttribute('aria-expanded', 'false');
            return;
        }

        this.navbarToggler.nativeElement.setAttribute('aria-expanded', 'true');
    }

    private listenToAppLoading() {
        this.isAppLoadingSubscription = this.loadingService.isLoading$.subscribe((isLoading: boolean) => {
            this.isAppLoading = isLoading;
        });
    }
}
