import { Component, OnInit } from '@angular/core';
import { JsonApiService } from "../../services/http/json-api.service";
import { ActivatedRoute, UrlSegment } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { JsonApiResourceObject } from "../../models/json-api/json-api-resource-object";
import { JsonApiResource } from "../../models/json-api/json-api-resource";

@Component({
    selector: 'blog-blog-show',
    templateUrl: './blog-show.component.html',
    styleUrls: ['./blog-show.component.scss']
})
export class BlogShowComponent implements OnInit {
    private _blog: JsonApiResourceObject;
    private $url: Subscription;

    public constructor(private jsonApiService: JsonApiService, private route: ActivatedRoute) { }

    public ngOnInit() {
        this.readBlogSlug().then((blogSlug: string) => {
            this.getBlog(blogSlug);
        });
    }

    private getBlog(blogSlug: string) {
        this.jsonApiService.get(`blogs/${blogSlug}`).subscribe((jsonApiResource: JsonApiResource) => {
            this._blog = jsonApiResource.data;
        });
    }

    private readBlogSlug(): Promise<string> {
        return new Promise((resolve) => {
            this.$url = this.route.url.subscribe((urlSegment: UrlSegment[]) => {
                resolve(urlSegment[0].path);
            });
        });
    }

    public get blog(): JsonApiResourceObject {
        return this._blog;
    }
}
