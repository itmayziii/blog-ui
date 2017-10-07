import {Component, OnDestroy, OnInit} from '@angular/core';
import {JsonApiService} from "../../services/http/json-api.service";
import {RequestOptions, URLSearchParams} from "@angular/http";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {JsonApiResources} from "../../models/json-api/json-api-resoures";
import {JsonApiResourceObject} from "../../models/json-api/json-api-resource-object";
import {UserService} from "../../services/user.service";
import {NotificationsService} from "angular2-notifications/dist";

@Component({
    selector: 'blog-list',
    templateUrl: './blog-list.component.html',
    styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit, OnDestroy {
    private $params: Subscription;
    private page: string = '1';
    private size: string = '10';
    private _blogs: JsonApiResourceObject[];

    public constructor(
        private jsonApi: JsonApiService,
        private route: ActivatedRoute,
        private userService: UserService,
        private router: Router,
        private notifications: NotificationsService
    ) {
    }

    public ngOnInit() {
        this.readQueryParameters().then(() => {
            this.retrieveBlogs();
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

    private retrieveBlogs(): void {
        const urlSearchParams = new URLSearchParams();
        urlSearchParams.set('size', this.size);
        urlSearchParams.set('page', this.page);

        const requestOptions = new RequestOptions({params: urlSearchParams});
        this.jsonApi.get('blogs', requestOptions).subscribe(
            (response: JsonApiResources) => {
                this._blogs = response.data;
                console.log(this._blogs);
            },
            (error: any) => {
                this.notifications.error('Error', 'Unable to show blog posts');
            }
        );
    }

    public get blogs(): JsonApiResourceObject[] {
        return this._blogs;
    }

    public limit(content: string): string {
        return content.substr(0, 200);
    }

    public navigateToCreatePage(): void {
        this.router.navigate(['blogs/create']);
    }

    public isAdmin(): boolean {
        return this.userService.isAdmin();
    }
}
