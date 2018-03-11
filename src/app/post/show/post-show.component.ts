import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { JsonApiResourceObject } from "../../models/json-api/json-api-resource-object";
import { JsonApiResource } from "../../models/json-api/json-api-resource";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { MarkdownService } from "../../services/markdown.service";
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Post } from "../../models/post";
import { UserService } from "../../services/user.service";

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

            <div *ngIf="content" class="post-content col-11">
                <div class="row" [innerHTML]="parsedPostContent"></div>
            </div>
        </div>
    `,
    styleUrls: ['./post-show.component.scss']
})
export class PostShowComponent implements OnInit {
    private _post: JsonApiResourceObject;
    private $url: Subscription;
    private _parsedPostContent: SafeHtml;
    @Input() public content: Observable<string>;

    public constructor(private httpClient: HttpClient,
                       private route: ActivatedRoute,
                       private sanitizer: DomSanitizer,
                       private markdownService: MarkdownService,
                       private router: Router,
                       private userService: UserService) { }

    public ngOnInit() {
        if (this.content) {
            this.content.subscribe((content) => {
                this.parseMarkdown(content);
            });
            return;
        }

        this.readPostSlug().then((postSlug: string) => {
            this.getPost(postSlug);
        });
    }

    public isAdmin(): boolean {
        return this.userService.isAdmin();
    }

    private getPost(postSlug: string) {
        this.httpClient.get(`posts/${postSlug}`)
            .subscribe(
                (response: JsonApiResource<Post>) => {
                    this._post = response.data;
                    this.parseMarkdown(this._post.attributes.content);
                },
                (error: HttpErrorResponse) => {
                    this.router.navigate(['/not-found'])
                }
            );
    }

    private parseMarkdown(content) {
        this.markdownService.parse(content, (err, result) => {
            this._parsedPostContent = this.sanitizer.bypassSecurityTrustHtml(result);
        });
    }

    private readPostSlug(): Promise<string> {
        return new Promise((resolve) => {
            this.$url = this.route.url.subscribe((urlSegment: UrlSegment[]) => {
                resolve(urlSegment[0].path);
            });
        });
    }

    public get post(): JsonApiResourceObject {
        return this._post;
    }

    public get parsedPostContent(): SafeHtml {
        return this._parsedPostContent;
    }
}
