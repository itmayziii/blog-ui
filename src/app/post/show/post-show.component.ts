import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ISubscription } from "rxjs/Subscription";
import { JsonApiResourceObject } from "../../models/json-api/json-api-resource-object";
import { DomSanitizer, SafeHtml, Title } from "@angular/platform-browser";
import { MarkdownService } from "../../services/markdown.service";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { UserService } from "../../services/user.service";
import { NotificationsService } from "angular2-notifications";
import { Post } from "../../models/post";
import { environment } from "../../../environments/environment";
import { MetaService } from "../../meta.service";

@Component({
    selector: 'blog-post-show',
    template: `
        <div class="container-fluid post">
            <div class="row justify-content-center align-items-center" *ngIf="post">
                <div class="col-12">
                    <div class="row justify-content-center">
                        <div *ngIf="isAdmin()" class="col-11">
                            <div class="post-actions row justify-content-center justify-content-md-end">
                                <button class="btn btn-secondary btn-sm post-actions-item" routerLink="/posts/create">Create New Post</button>
                                <button *ngIf="post" class="btn btn-secondary btn-sm post-actions-item" routerLink="/posts/update/{{ post.attributes.slug }}">Update Post</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-12 post-hero d-block d-md-none" [style.background-image]="'url(' + post.attributes.imagePathSm + ')'"></div>
                <div class="col-12 post-hero d-none d-md-block d-lg-none" [style.background-image]="'url(' + post.attributes.imagePathMd + ')'">
                    <div class="row align-items-center h-100">
                        <h1 class="col-5 offset-1 post-title text-secondary">{{post?.attributes?.title}}</h1>
                    </div>
                </div>
                <div class="col-12 post-hero d-none d-lg-block" [style.background-image]="'url(' + post.attributes.imagePathLg + ')'">
                    <div class="row align-items-center h-100">
                        <h1 class="col-5 offset-1 post-title text-secondary">{{post?.attributes?.title}}</h1>
                    </div>
                </div>
                <h1 class="post-title d-block d-md-none text-center text-secondary col-11">{{post?.attributes?.title}}</h1>
                <div class="post-content col-11">
                    <div class="row" [innerHTML]="parsedPostContent"></div>
                </div>
            </div>

            <div *ngIf="content$" class="post-content col-11">
                <div class="row" [innerHTML]="parsedPostContent"></div>
            </div>
        </div>
    `,
    styleUrls: ['./post-show.component.scss']
})
export class PostShowComponent implements OnInit, OnDestroy {
    private _post: Post;
    private _parsedPostContent: SafeHtml;
    private _contentSubscription: ISubscription;
    @Input() public content$: Observable<string>;

    public constructor(private httpClient: HttpClient,
                       private route: ActivatedRoute,
                       private sanitizer: DomSanitizer,
                       private markdownService: MarkdownService,
                       private notifications: NotificationsService,
                       private router: Router,
                       private userService: UserService,
                       private title: Title,
                       private metaService: MetaService) { }

    public ngOnInit(): void {
        if (this.content$) {
            this._contentSubscription = this.content$.subscribe((content) => {
                this.parseMarkdown(content);
            });
            return;
        }

        if (!this.route.snapshot.data.post) {
            this.router.navigate(['/not-found']);
            return;
        }
        this.readRouteData();
        this.addMetadata();
    }

    public ngOnDestroy(): void {
        if (this._contentSubscription) {
            this._contentSubscription.unsubscribe();
        }

        this.metaService.removeMeta();
    }

    public isAdmin(): boolean {
        return this.userService.isAdmin();
    }

    private parseMarkdown(content) {
        this.markdownService.parse(content, (err, result) => {
            this._parsedPostContent = this.sanitizer.bypassSecurityTrustHtml(result);
        });
    }

    private readRouteData(): void {
        this._post = this.route.snapshot.data.post.data;
        this._parsedPostContent = this.sanitizer.bypassSecurityTrustHtml(this.route.snapshot.data.post.parsedContent);
    }

    private addMetadata(): void {
        const title = `Post: ${this._post.attributes.title}`;
        const description = this._post.attributes.preview;
        const url = `${environment.appUri}${this.router.url}`;

        this.title.setTitle(title + ' | Full Heap Developer');
        this.metaService.setMeta([
            {name: 'url', content: url},
            {name: 'description', content: description},
            {property: 'og:title', content: title},
            {property: 'og:url', content: url},
            {property: 'og:description', content: description},
            {property: 'og:image', content: `${environment.appUri}/images/website-preview.jpg`}, // should be 1200 x 630
            {property: 'og:image:width', content: '1200px'},
            {property: 'og:image:height', content: '630px'}
        ]);
    }

    public get post(): JsonApiResourceObject {
        return this._post;
    }

    public get parsedPostContent(): SafeHtml {
        return this._parsedPostContent;
    }
}
