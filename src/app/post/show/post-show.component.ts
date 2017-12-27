import { Component, OnInit } from '@angular/core';
import { JsonApiService } from "../../services/http/json-api.service";
import { ActivatedRoute, UrlSegment } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { JsonApiResourceObject } from "../../models/json-api/json-api-resource-object";
import { JsonApiResource } from "../../models/json-api/json-api-resource";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { MarkdownService } from "../../services/markdown.service";

@Component({
    selector: 'blog-post-show',
    templateUrl: './post-show.component.html',
    styleUrls: ['./post-show.component.scss']
})
export class PostShowComponent implements OnInit {
    private _post: JsonApiResourceObject;
    private $url: Subscription;
    private _parsedPostContent: SafeHtml;

    public constructor(private jsonApiService: JsonApiService, private route: ActivatedRoute, private sanitizer: DomSanitizer, private markdownService: MarkdownService) { }

    public ngOnInit() {
        this.readPostSlug().then((blogSlug: string) => {
            this.getBlog(blogSlug);
        });
    }

    private getBlog(postSlug: string) {
        this.jsonApiService.get(`posts/${postSlug}`).subscribe((jsonApiResource: JsonApiResource) => {
            this._post = jsonApiResource.data;

            this.markdownService.parse(this._post.attributes.content, (err, result) => {
                this._parsedPostContent = this.sanitizer.bypassSecurityTrustHtml(result);
            });
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
