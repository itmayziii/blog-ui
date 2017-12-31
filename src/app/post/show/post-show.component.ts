import { Component, Input, OnInit } from '@angular/core';
import { JsonApiService } from "../../services/http/json-api.service";
import { ActivatedRoute, UrlSegment } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { JsonApiResourceObject } from "../../models/json-api/json-api-resource-object";
import { JsonApiResource } from "../../models/json-api/json-api-resource";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { MarkdownService } from "../../services/markdown.service";
import { Observable } from "rxjs/Observable";

@Component({
    selector: 'blog-post-show',
    template: `
        <div class="container-fluid post">
            <div class="row">
                <h1 class="post-title text-center text-secondary w-100">{{post?.attributes?.title}}</h1>
                <div class="post-content w-85 m-auto" [innerHTML]="parsedPostContent"></div>
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

    public constructor(private jsonApiService: JsonApiService, private route: ActivatedRoute, private sanitizer: DomSanitizer, private markdownService: MarkdownService) { }

    public ngOnInit() {
        if (this.content) {
            this.content.subscribe((content) => {
                this.parseMarkdown(content);
            });
            return;
        }

        this.readPostSlug().then((blogSlug: string) => {
            this.getBlog(blogSlug);
        });

    }

    private getBlog(postSlug: string) {
        this.jsonApiService.get(`posts/${postSlug}`).subscribe((jsonApiResource: JsonApiResource) => {
            this._post = jsonApiResource.data;
            this.parseMarkdown(this._post.attributes.content);
        });
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
