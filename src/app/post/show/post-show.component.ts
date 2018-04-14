import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JsonApiResourceObject } from '../../models/json-api/json-api-resource-object';
import { Title } from '@angular/platform-browser';
import { UserService } from '../../services/user.service';
import { NotificationsService } from 'angular2-notifications';
import { Post } from '../../models/post';
import { environment } from '../../../environments/environment';
import { MetaService } from '../../meta.service';
import { isPlatformBrowser } from '@angular/common';
import { WindowRef } from '../../globals/window-ref';

declare var FB: any;

@Component({
    selector: 'blog-post-show',
    templateUrl: './post-show.component.html',
    styleUrls: ['./post-show.component.scss']
})
export class PostShowComponent implements OnInit, OnDestroy, AfterViewInit {
    private _post: Post;
    @ViewChild('postTitleMedium') private postTitleMediumElRef: ElementRef;
    @ViewChild('postTitleLarge') private postTitleLargeElRef: ElementRef;
    public content: string;
    public shouldHideDesktopSocialIcons: boolean = true;
    public shouldHideMobileSocialIcons: boolean = true;
    public encodedComponents = {
        url: null,
        title: null
    };

    public constructor(private route: ActivatedRoute,
                       private notifications: NotificationsService,
                       private userService: UserService,
                       private title: Title,
                       private router: Router,
                       private metaService: MetaService,
                       private windowRef: WindowRef,
                       @Inject(PLATFORM_ID) private platformId: Object) {
    }

    public ngOnInit(): void {
        this.readRouteData();
        this.prepareEncodedComponents();
        this.addMetadata();
    }

    public ngAfterViewInit(): void {
        this.observeIfTitleIsInView();
    }

    public ngOnDestroy(): void {
        this.metaService.removeMeta();
    }

    public facebookSharePost(): void {
        if (!FB) {
            console.error('PostShowComponent: facebook has not been initialized to share the post');
            return;
        }

        FB.ui({
            method: 'share',
            href: this.encodedComponents.url,
        }, function (response) {
        });
    }

    public formatDateToLocale(dateString) {
        const utcDate = new Date(dateString);
        const usersOptions = Intl.DateTimeFormat().resolvedOptions();
        const dateTimeFormatOptions = {
            weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric',
            timeZone: usersOptions.timeZone
        };

        return Intl.DateTimeFormat(usersOptions.locale, dateTimeFormatOptions).format(utcDate);
    }

    public isAdmin(): boolean {
        return this.userService.isAdmin();
    }

    public toggleMobileShareDialog(): void {
        this.shouldHideMobileSocialIcons = !this.shouldHideMobileSocialIcons;
    }

    private readRouteData(): void {
        this._post = this.route.snapshot.data.post.data;
        this.content = this.route.snapshot.data.post.parsedContent;
    }

    private addMetadata(): void {
        const title = `Post: ${this._post.attributes.title}`;
        const description = this._post.attributes.preview;
        const url = `${environment.appUri}${this.router.url}`;
        const previewImage = this._post.attributes.imagePathMeta;

        this.title.setTitle(title + ' | Full Heap Developer');
        this.metaService.setMeta([
            {name: 'url', content: url},
            {name: 'description', content: description},
            {name: 'twitter:card', content: 'summary'},
            {name: 'twitter:creator', content: '@itmayziii'},
            {property: 'og:title', content: title},
            {property: 'og:url', content: url},
            {property: 'og:description', content: description},
            {property: 'og:image', content: `${environment.appUri}${previewImage}`},
            {property: 'og:image:width', content: '1200px'},
            {property: 'og:image:height', content: '630px'}
        ]);
    }

    private observeIfTitleIsInView(): void {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        if (!('IntersectionObserver' in this.windowRef.nativeWindow)) {
            this.shouldHideDesktopSocialIcons = false;
            return;
        }

        const observerOptions = {
            threshold: [0]
        };
        const windowObserver = new IntersectionObserver((entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
            if (this.windowRef.nativeWindow.innerWidth < 768) {// Share icons on mobile display when a user clicks share, not on scroll
                return;
            }

            if (entries[0].isIntersecting || entries[0].boundingClientRect.top === 0) {
                this.shouldHideDesktopSocialIcons = true;
                return;
            }

            this.shouldHideDesktopSocialIcons = false;
        }, observerOptions);

        windowObserver.observe(this.postTitleLargeElRef.nativeElement);
        windowObserver.observe(this.postTitleMediumElRef.nativeElement);
    }

    private prepareEncodedComponents() {
        this.encodedComponents.url = encodeURI(`${environment.appUri}${this.router.url}`);
        this.encodedComponents.title = encodeURIComponent(this._post.attributes.title);
    }

    public get post(): JsonApiResourceObject {
        return this._post;
    }
}
