import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Post } from "../../models/post";
import { Category } from "../../models/category";
import { JsonApiResource } from "../../models/json-api/json-api-resource";

@Component({
    selector: 'blog-category-show',
    template: `
        <blog-post-list [isCategory]="true"></blog-post-list>
    `,
    styleUrls: ['./category-show-posts.component.scss']
})
export class CategoryShowPostsComponent implements OnInit {
    private _posts: Post[] = [];
    private _category: Category;

    public constructor(private httpClient: HttpClient, private route: ActivatedRoute) { }

    public ngOnInit() {
        this.readCategorySlug()
            .then((categorySlug) => {
                this.retrievePostsForCategory(categorySlug)
            });
    }

    private readCategorySlug(): Promise<string> {
        return new Promise((resolve) => {
            this.route.url.subscribe((urlSegment: UrlSegment[]) => {
                resolve(urlSegment[0].path);
            });
        });
    }

    public get posts(): Post[] {
        return this._posts;
    }

    private retrievePostsForCategory(categorySlug: string): void {
        this.httpClient.get(`categories/${categorySlug}/posts`).subscribe((response: JsonApiResource<Category>) => {
            const posts = response.included.filter((includedRelationship) => includedRelationship.type === 'posts');
            this._category = response.data;
            this._posts = posts;
        })
    }
}
