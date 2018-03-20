import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { ISubscription } from "rxjs/Subscription";
import { JsonApiResources } from "../../models/json-api/json-api-resoures";
import { UserService } from "../../services/user.service";
import { NotificationsService } from "angular2-notifications";
import { HttpClient, HttpParams } from "@angular/common/http";
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
    private _categoryList: Category[];
    private _category: Category;
    private _dataSubscription: ISubscription;

    public constructor(private httpClient: HttpClient,
                       private route: ActivatedRoute,
                       private userService: UserService,
                       private router: Router,
                       private notifications: NotificationsService) {
    }

    public ngOnInit() {
        this.readRouteData();
        this.observeRouteData();
        this.observeQueryParams();
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

    private readRouteData(): void {
        this._posts = this.route.snapshot.data.posts.data;
        this._categoryList = this.route.snapshot.data.categoryList.data;
        this._firstPageUrl = (this.route.snapshot.data.posts.links) ? this.route.snapshot.data.posts.links.first : null;
        this._lastPageUrl = (this.route.snapshot.data.posts.links) ? this.route.snapshot.data.posts.links.last : null;
        this._size = this.route.snapshot.data.posts.size;
        this._page = this.route.snapshot.data.posts.page;
    }

    private observeQueryParams(): void {
        // The first observable value is already handled via the snapshot for universal to work, so we skip it
        this.route.queryParamMap.skip(1).subscribe((queryParams: ParamMap) => {
            this._posts = null;

            this._size = queryParams.get('size') || this._size;
            this._page = queryParams.get('page') || this._page;

            const httpParams = new HttpParams({
                fromObject: {
                    size: this._size,
                    page: this._page
                }
            });
            const requestOptions = {
                params: httpParams
            };

            this.httpClient.get('posts', requestOptions).subscribe((response: JsonApiResources<Post>) => {
                this._posts = response.data;
            });
        });
    }

    private observeRouteData(): void {
        // The first observable value is already handled via the snapshot for universal to work, so we skip it
        this._dataSubscription = this.route.data.skip(1).subscribe((data: any) => {
            this._posts = data.posts.data;
            this._size = data.posts.size;
            this._page = data.posts.page;
        });
    }

    public get posts(): Post[] {
        return this._posts;
    }

    public get isCategory(): boolean {
        return this._isCategory;
    }

    public get categoryList(): Category[] {
        return this._categoryList;
    }

    public get category(): Category {
        return this._category;
    }
}
