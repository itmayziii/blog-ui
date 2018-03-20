import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { ISubscription } from "rxjs/Subscription";
import { JsonApiResources } from "../../models/json-api/json-api-resoures";
import { UserService } from "../../services/user.service";
import { NotificationsService } from "angular2-notifications";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Post } from "../../models/post";
import { Category } from "../../models/category";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/skip";

@Component({
    selector: 'blog-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
    private _isCategory: boolean = false;
    private _page: string = '1';
    private _size: string = '12';
    private _firstPageUrl: string;
    private _lastPageUrl: string;
    private _posts: Post[];
    private _categoriesList: Category[];
    private _category: Category;
    private _dataSubscription: ISubscription;

    public constructor(private httpClient: HttpClient,
                       private route: ActivatedRoute,
                       private userService: UserService,
                       private router: Router,
                       private notifications: NotificationsService) {
    }

    public ngOnInit() {
        this._posts = this.route.snapshot.data.posts.data;

        this.observeQueryParams();

        // The first observable value is already handled via the snapshot for universal to work, so we skip it
        this._dataSubscription = this.route.data.skip(1).subscribe((data: any) => {
            this._posts = data.posts.data;
            this._size = data.posts.size;
            this._page = data.posts.page;
        });

        this._firstPageUrl = (this.route.snapshot.data.posts.links) ? this.route.snapshot.data.posts.links.first : null;
        this._lastPageUrl = (this.route.snapshot.data.posts.links) ? this.route.snapshot.data.posts.links.last : null;

        this.retrieveCategoriesList();
    }

    public ngOnDestroy() {
        if (this._dataSubscription) {
            this._dataSubscription.unsubscribe();
        }
    }

    public isAdmin(): boolean {
        return this.userService.isAdmin();
    }

    public isFirstPage(): boolean {
        if (!this._firstPageUrl) {
            return true;
        }

        const queryStringPosition = this._firstPageUrl.indexOf('?');
        if (!queryStringPosition) {
            return true; // If the last page does not include a query string then we should just bail
        }

        const queryParamsString = this._firstPageUrl.substring(queryStringPosition + 1);
        const queryParams = queryParamsString.split('&');

        const pageQueryParam = queryParams.find(queryParam => queryParam.includes('page'));
        const pageValue = pageQueryParam.substring(pageQueryParam.indexOf('=') + 1);

        return (pageValue === this._page);
    }

    public isLastPage(): boolean {
        if (!this._lastPageUrl) {
            return true;
        }

        const queryStringPosition = this._lastPageUrl.indexOf('?');
        if (!queryStringPosition) {
            return true; // If the last page does not include a query string then we should just bail
        }

        const queryParamsString = this._lastPageUrl.substring(queryStringPosition + 1);
        const queryParams = queryParamsString.split('&');

        const pageQueryParam = queryParams.find(queryParam => queryParam.includes('page'));
        const pageValue = pageQueryParam.substring(pageQueryParam.indexOf('=') + 1);

        return (pageValue === this._page);
    }

    public trackPost(post: Post) {
        return post ? post.id : undefined;
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

    // public loadLastPage(): void {
    //     const lastPage = this._lastPageUrl.searchParams.get('page');
    //     const queryParams = {
    //         "page": lastPage,
    //         "size": this._size
    //     };
    //
    //     this.router.navigate(['/posts'], {
    //         queryParams: queryParams,
    //         queryParamsHandling: 'merge'
    //     });
    // }
    //
    // public loadFirstPage(): void {
    //     const firstPage = this._firstPageUrl.searchParams.get('page');
    //     const queryParams = {
    //         "page": firstPage,
    //         "size": this._size
    //     };
    //
    //     this.router.navigate(['/posts'], {
    //         queryParams: queryParams,
    //         queryParamsHandling: 'merge'
    //     });
    // }

    // private retrievePosts(): any {
    //     return combineLatest(this.route.paramMap, this.route.queryParamMap)
    //         .switchMap((params: ParamMap[]): any => {
    //             this._posts = null;
    //             const [paramMap, queryParamMap] = params;
    //
    //             this._size = queryParamMap.get('size') || this._size;
    //             this._page = queryParamMap.get('page') || this._page;
    //             const httpParams = new HttpParams({
    //                 fromObject: {
    //                     size: this._size,
    //                     page: this._page
    //                 }
    //             });
    //             const requestOptions = {
    //                 params: httpParams
    //             };
    //
    //             const categorySlug = paramMap.get('categorySlug');
    //             if (categorySlug) {
    //                 return this.httpClient.get(`categories/${categorySlug}/posts`, requestOptions).map((response: JsonApiResource<Category>) => {
    //                     this._category = response.data;
    //                     this._isCategory = true;
    //                     if (!response.included) {
    //                         return [];
    //                     }
    //
    //                     return response.included.filter((includedData: any) => {
    //                         return includedData.type === 'posts';
    //                     });
    //                 });
    //             }
    //
    //             this._isCategory = false;
    //             return this.httpClient.get(`posts`, requestOptions).map((response: JsonApiResources<Post>) => {
    //                 this._firstPageUrl = new URL(response.links.first);
    //                 this._lastPageUrl = new URL(response.links.last);
    //                 return response.data;
    //             });
    //         });
    // }

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

    private observeQueryParams(): void {
        this.route.queryParamMap.subscribe((queryParams: ParamMap) => {
            this._size = queryParams.get('size') || '12';
            this._page = queryParams.get('page') || '1';
        });
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
