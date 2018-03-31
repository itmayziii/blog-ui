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

declare var $: any;
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
    public test: boolean = true;
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
                       @Inject(PLATFORM_ID) private platformId: Object) {
    }

    public ngOnInit(): void {
        this.readRouteData();
        this.prepareEncodedComponents();
        this.addMetadata();

        this.initializePopovers();
    }

    public ngAfterViewInit(): void {
        this.observeIfTitleIsInView();
    }

    public ngOnDestroy(): void {
        this.metaService.removeMeta();
    }

    public facebookSharePost(): void {
        if (!FB) {
            console.error('PostShowComponent: facebook has not been initialied to share the post');
            return;
        }

        FB.ui({
            method: 'share',
            href: this.encodedComponents.url,
        }, function (response) {
        });
    }

    public isAdmin(): boolean {
        return this.userService.isAdmin();
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

    private initializePopovers(): void {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        const popperContent = document.createElement('div');
        popperContent.innerHTML = `
                <i class="fa fa-facebook-square facebook-icon" aria-hidden="true"></i>
                <i class="fa fa-twitter-square twitter-icon" aria-hidden="true"></i>
            `;

        $('[data-post-share]').popover({
            content: popperContent,
            html: true
        });
    }

    private observeIfTitleIsInView(): void {
        const observerOptions = {
            threshold: [0]
        };

        const windowObserver = new IntersectionObserver((entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
            if (entries[0].isIntersecting || entries[0].boundingClientRect.top === 0) {
                this.test = true;
                return;
            }

            this.test = false;
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
