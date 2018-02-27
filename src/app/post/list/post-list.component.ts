import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { JsonApiResources } from "../../models/json-api/json-api-resoures";
import { JsonApiResourceObject } from "../../models/json-api/json-api-resource-object";
import { UserService } from "../../services/user.service";
import { NotificationsService } from "angular2-notifications";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Post } from "../../models/post";

@Component({
    selector: 'blog-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
    private $params: Subscription;
    private page: string = '1';
    private size: string = '12';
    private _posts: JsonApiResourceObject[];

    public constructor(private httpClient: HttpClient,
                       private route: ActivatedRoute,
                       private userService: UserService,
                       private router: Router,
                       private notifications: NotificationsService) {
    }

    public ngOnInit() {
        this.readQueryParameters().then(() => {
            this.retrievePosts();
        });
    }

    public ngOnDestroy() {
        this.$params.unsubscribe();
    }

    private readQueryParameters(): Promise<ParamMap> {
        return new Promise((resolve) => {
            this.$params = this.route.queryParamMap.subscribe(
                (queryParams: ParamMap) => {
                    this.size = queryParams.get('size') || this.size;
                    this.page = queryParams.get('page') || this.page;
                    resolve();
                },
                (error) => {
                    console.error('Could not read query params: ', error);
                    resolve();
                }
            );
        });
    }

    private retrievePosts(): void {
        let queryParams: HttpParams = new HttpParams();
        queryParams = queryParams.set('size', this.size);
        queryParams = queryParams.set('page', this.page);

        const requestOptions = {params: queryParams};
        this.httpClient.get('posts', requestOptions).subscribe(
            (response: JsonApiResources<Post>) => {
                this._posts = response.data;
            },
            (error: HttpErrorResponse) => {
                this.notifications.error('Error', 'Unable to show posts');
            }
        );
    }

    public get posts(): JsonApiResourceObject[] {
        return this._posts;
    }

    public navigateToCreatePage(): void {
        this.router.navigate(['posts/create']);
    }

    public isAdmin(): boolean {
        return this.userService.isAdmin();
    }
}
