import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { ISubscription } from "rxjs/Subscription";
import { JsonApiResources } from "../../models/json-api/json-api-resoures";
import { UserService } from "../../services/user.service";
import { NotificationsService } from "angular2-notifications";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Post } from "../../models/post";
import { Category } from "../../models/category";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { combineLatest } from "rxjs/observable/combineLatest";
import { JsonApiResource } from "../../models/json-api/json-api-resource";

@Component({
    selector: 'blog-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
    private _isCategory: boolean = false;
    private _page: string = '1';
    private _size: string = '12';
    private _firstPageUrl: URL;
    private _lastPageUrl: URL;
    private _posts: Post[];
    private _categoriesList: Category[];
    private _category: Category;
    private _postsSubscription: ISubscription;

    public constructor(private httpClient: HttpClient,
                       private route: ActivatedRoute,
                       private userService: UserService,
                       private router: Router,
                       private notifications: NotificationsService) {
    }

    public ngOnInit() {
        this._postsSubscription = this.retrievePosts().subscribe((posts) => {
            this._posts = posts;
        });

        this.retrieveCategoriesList();
    }

    public ngOnDestroy() {
        if (this._postsSubscription) {
            this._postsSubscription.unsubscribe();
        }
    }

    public isAdmin(): boolean {
        return this.userService.isAdmin();
    }

    public isFirstPage(): boolean {
        const firstPage = this._firstPageUrl.searchParams.get('page');
        return (firstPage && firstPage === this._page);
    }

    public isLastPage(): boolean {
        const lastPage = this._lastPageUrl.searchParams.get('page');
        return (lastPage && lastPage === this._page);
    }

    public loadNextPage(): void {
        const queryParams = {
            "page": (parseInt(this._page) + 1).toString(),
            "size": this._size
        };

        this.router.navigate(['/posts'], {
            queryParams: queryParams,
            queryParamsHandling: 'merge'
        });
    }

    public loadPreviousPage(): void {
        const queryParams = {
            "page": (parseInt(this._page) - 1).toString(),
            "size": this._size
        };

        this.router.navigate(['/posts'], {
            queryParams: queryParams,
            queryParamsHandling: 'merge'
        });
    }

    public loadLastPage(): void {
        const lastPage = this._lastPageUrl.searchParams.get('page');
        const queryParams = {
            "page": lastPage,
            "size": this._size
        };

        this.router.navigate(['/posts'], {
            queryParams: queryParams,
            queryParamsHandling: 'merge'
        });
    }

    public loadFirstPage(): void {
        const firstPage = this._firstPageUrl.searchParams.get('page');
        const queryParams = {
            "page": firstPage,
            "size": this._size
        };

        this.router.navigate(['/posts'], {
            queryParams: queryParams,
            queryParamsHandling: 'merge'
        });
    }

    private retrievePosts(): any {
        return combineLatest(this.route.paramMap, this.route.queryParamMap)
            .switchMap((params: ParamMap[]): any => {
                this._posts = null;
                const [paramMap, queryParamMap] = params;

                this._size = queryParamMap.get('size') || this._size;
                this._page = queryParamMap.get('page') || this._page;
                const httpParams = new HttpParams({
                    fromObject: {
                        size: this._size,
                        page: this._page
                    }
                });
                const requestOptions = {
                    params: httpParams
                };

                const categorySlug = paramMap.get('categorySlug');
                if (categorySlug) {
                    return this.httpClient.get(`categories/${categorySlug}/posts`, requestOptions).map((response: JsonApiResource<Category>) => {
                        this._category = response.data;
                        this._isCategory = true;
                        return response.included.filter((includedData: any) => {
                            return includedData.type === 'posts';
                        });
                    });
                }

                this._isCategory = false;
                return this.httpClient.get(`posts`, requestOptions).map((response: JsonApiResources<Post>) => {
                    this._firstPageUrl = new URL(response.links.first);
                    this._lastPageUrl = new URL(response.links.last);
                    return response.data;
                });
            });
    }

    private retrieveCategoriesList(): void {
        this.httpClient.get('categories').subscribe(
            (response: JsonApiResources<Category>) => {
                this._categoriesList = response.data;
            },
            (error: HttpErrorResponse) => {
                this.notifications.error('Error', 'Unable to retrieve categories list.');
            }
        )
    }

    public get posts(): Post[] {
        return this._posts;
    }

    public get isCategory(): boolean {
        return this._isCategory;
    }

    public get categoriesList(): Category[] {
        return this._categoriesList;
    }

    public get category(): Category {
        return this._category;
    }
}
