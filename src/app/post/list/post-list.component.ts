import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { JsonApiResources } from "../../models/json-api/json-api-resoures";
import { UserService } from "../../services/user.service";
import { NotificationsService } from "angular2-notifications";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Post } from "../../models/post";
import { Category } from "../../models/category";
import 'rxjs/add/operator/switchMap';
import { Observable } from "rxjs/Observable";
import { JsonApiResource } from "../../models/json-api/json-api-resource";

@Component({
    selector: 'blog-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
    @Input() public isCategory = false;
    private categories$: Observable<JsonApiResource<Category>>;

    private $params: Subscription;
    private page: string = '1';
    private size: string = '12';
    private _posts: Post[];
    private _categoriesList: Category[];
    private _category: Category;

    public constructor(private httpClient: HttpClient,
                       private route: ActivatedRoute,
                       private userService: UserService,
                       private router: Router,
                       private notifications: NotificationsService) {
    }

    public ngOnInit() {
        this.readQueryParameters().then(() => {
            if (this.isCategory) {
                this.retrievePostsByCategory();
            } else {
                this.retrieveLatestPosts();
            }

            this.retrieveCategoriesList();
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

    private retrieveLatestPosts(): void {
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

    private retrievePostsByCategory(): void {
        this.categories$ = this.route.paramMap
            .switchMap((params: ParamMap) => {
                const categorySlug = params.get('slug');
                return <Observable<JsonApiResource<Category>>> this.httpClient.get(`categories/${categorySlug}/posts`);
            });

        this.categories$.subscribe((response: JsonApiResource<Category>) => {
            this._category = response.data;
            this._posts = response.included.filter((includedRelationship) => includedRelationship.type === 'posts');
        });
    }

    private retrieveCategoriesList(): void {
        this.httpClient.get('categories').subscribe(
            (response: JsonApiResources<Category>) => {
                this._categoriesList = response.data;
            },
            (error: HttpErrorResponse) => {
                this.notifications.error('Error', 'Unable to retrieve categories');
            }
        )
    }

    public get posts(): Post[] {
        return this._posts;
    }

    public get categoriesList(): Category[] {
        return this._categoriesList;
    }

    public get category(): Category {
        return this._category;
    }

    public navigateToCreatePage(): void {
        this.router.navigate(['posts/create']);
    }

    public isAdmin(): boolean {
        return this.userService.isAdmin();
    }
}
