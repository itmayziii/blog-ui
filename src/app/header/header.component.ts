import { Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { NavLink } from '../models/nav-link';
import { UserService } from '../services/user.service';
import { LoadingService } from '../services/loading.service';
import { ISubscription } from 'rxjs/Subscription';
import { isPlatformBrowser } from '@angular/common';

declare var $: any;

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
                           (click)="closeNavbar()"
                           routerLinkActive="active"
                           class="nav-link"
                           *ngIf="leftLink.condition()"
                        >{{leftLink.title}}</a>
                    </li>
                </ul>

                <ul class="navbar-nav ml-auto">
                    <li *ngFor="let rightLink of rightLinks" class="nav-item">
                        <a routerLink="{{ rightLink.path }}"
                           (click)="closeNavbar()"
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

    public closeNavbar() {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        this.swapTogglerIcon();

        $('.navbar-collapse').collapse('hide');
    }

    private listenToAppLoading() {
        this.isAppLoadingSubscription = this.loadingService.isLoading$.subscribe((isLoading: boolean) => {
            this.isAppLoading = isLoading;
        });
    }
}
