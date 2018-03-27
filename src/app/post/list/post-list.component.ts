import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';
import { JsonApiResources } from '../../models/json-api/json-api-resoures';
import { UserService } from '../../services/user.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Post } from '../../models/post';
import { Category } from '../../models/category';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/skip';
import { MetaService } from '../../meta.service';
import { Title } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: 'blog-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
    private _category: Category;
    private _page: string = '1';
    private _size: string = '12';
    private _firstPageUrl: string;
    private _lastPageUrl: string;
    private _posts: Post[];
    private _categories: Category[];
    private _dataSubscription: ISubscription;

    public constructor(private httpClient: HttpClient,
                       private route: ActivatedRoute,
                       private userService: UserService,
                       private router: Router,
                       private notifications: NotificationsService,
                       private metaService: MetaService,
                       private title: Title) {
    }

    public ngOnInit(): void {
        if (!this.route.snapshot.data.posts) {
            this.notifications.error('Error', 'Could not retrieve posts.');
            return;
        }

        this.readRouteData();
        this.observeRouteData();
        this.observeQueryParams();

        this.addMetadata();
    }

    public ngOnDestroy(): void {
        if (this._dataSubscription) {
            this._dataSubscription.unsubscribe();
        }

        this.metaService.removeMeta();
    }

    public isAdmin(): boolean {
        return this.userService.isAdmin();
    }

    public isFirstPage(): boolean {
        if (!this._firstPageUrl) {
            return true;
        }

        const queryParamPageValue = this.getQueryStringValue(this._firstPageUrl, 'page');
        return (queryParamPageValue === this._page);
    }

    public isLastPage(): boolean {
        if (!this._lastPageUrl) {
            return true;
        }

        const queryParamPageValue = this.getQueryStringValue(this._lastPageUrl, 'page');
        return (queryParamPageValue === this._page);
    }

    public trackPost(post: Post) {
        return post ? post.id : undefined;
    }

    public loadNextPage(): void {
        const queryParams = {
            'page': (parseInt(this._page) + 1).toString(),
            'size': this._size
        };

        this.router.navigate(['/posts'], {
            queryParams: queryParams,
            queryParamsHandling: 'merge'
        });
    }

    public loadPreviousPage(): void {
        const queryParams = {
            'page': (parseInt(this._page) - 1).toString(),
            'size': this._size
        };

        this.router.navigate(['/posts'], {
            queryParams: queryParams,
            queryParamsHandling: 'merge'
        });
    }

    public loadLastPage(): void {
        if (!this._lastPageUrl) return;

        const lastPage = this.getQueryStringValue(this._lastPageUrl, 'page');
        const queryParams = {
            'page': lastPage,
            'size': this._size
        };

        this.router.navigate(['/posts'], {
            queryParams: queryParams,
            queryParamsHandling: 'merge'
        });
    }


    public loadFirstPage(): void {
        if (!this._firstPageUrl) return;

        const firstPage = this.getQueryStringValue(this._firstPageUrl, 'page');
        const queryParams = {
            'page': firstPage,
            'size': this._size
        };

        this.router.navigate(['/posts'], {
            queryParams: queryParams,
            queryParamsHandling: 'merge'
        });
    }

    private readRouteData(): void {
        this._posts = this.route.snapshot.data.posts.data;
        this._categories = this.route.snapshot.data.categories.data;
        this._firstPageUrl = (this.route.snapshot.data.posts.links) ? this.route.snapshot.data.posts.links.first : null;
        this._lastPageUrl = (this.route.snapshot.data.posts.links) ? this.route.snapshot.data.posts.links.last : null;
        this._size = this.route.snapshot.data.posts.size;
        this._page = this.route.snapshot.data.posts.page;
        this._category = this.route.snapshot.data.posts.category;
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
            this._firstPageUrl = (data.links) ? data.links.first : null;
            this._lastPageUrl = (data.links) ? data.links.last : null;
            this._category = data.posts.category;

            this.addMetadata();
        });
    }

    private addMetadata(): void {
        const title = 'Posts: ' + ((this.category) ? this.category.attributes.name : 'Latest');
        const description = (this.category) ? `Blog posts for "${this.category.attributes.name}" by Full Heap Developer` : 'Latest blog posts by Full Heap Developer';
        const url = `${environment.appUri}${this.router.url}`;
        const urlWithQueryParams = `${environment.appUri}${this.router.url}?page=${this._page}&size=${this._size}`

        this.title.setTitle(title + ' | Full Heap Developer');
        this.metaService.setMeta([
            {name: 'url', content: urlWithQueryParams},
            {name: 'description', content: description},
            {property: 'og:title', content: title},
            {property: 'og:url', content: url},
            {property: 'og:description', content: description},
            {property: 'og:image', content: `${environment.appUri}/images/website-preview.jpg`}, // should be 1200 x 630
            {property: 'og:image:width', content: '1200px'},
            {property: 'og:image:height', content: '630px'}
        ]);
    }

    /**
     * I would love to use URL but this is not available in node js so we must parse the query string ourselves
     */
    private getQueryStringValue(url: string, queryParamKey: string): string {
        const queryStringPosition = url.indexOf('?');
        if (!queryStringPosition) return; // If the url does not include a query string then we should just bail

        const queryParamsString = url.substring(queryStringPosition + 1);
        const queryParams = queryParamsString.split('&');

        const queryParam = queryParams.find(queryParam => queryParam.includes(queryParamKey));
        if (!queryParam) return;

        return queryParam.substring(queryParam.indexOf('=') + 1);
    }

    public get posts(): Post[] {
        return this._posts;
    }

    public get categories(): Category[] {
        return this._categories;
    }

    public get category(): Category {
        return this._category;
    }

    public get page(): string {
        return this._page;
    }
}
