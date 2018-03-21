import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from "@angular/common/http";
import { JsonApiResources } from "../models/json-api/json-api-resoures";
import { Post } from "../models/post";
import { JsonApiResource } from "../models/json-api/json-api-resource";
import { Category } from "../models/category";
import { JsonApiLinks } from "../models/json-api/json-api-links";
import { NotificationsService } from "angular2-notifications";
import { catchError, map } from "rxjs/operators";
import "rxjs/add/observable/empty";

interface PostsResolverData {
    data: Post[],
    size: string,
    page: string,
    category: Category,
    links?: JsonApiLinks
}

@Injectable()
export class PostsResolver implements Resolve<Observable<PostsResolverData>> {
    public constructor(private httpClient: HttpClient, private notifications: NotificationsService) {}

    public resolve(routeSnapshot: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot) {
        const size = routeSnapshot.queryParamMap.get('size') || '12';
        const page = routeSnapshot.queryParamMap.get('page') || '1';

        const httpParams = new HttpParams({
            fromObject: {size, page}
        });
        const requestOptions = {
            params: httpParams
        };

        const categorySlug = routeSnapshot.paramMap.get('categorySlug');
        if (categorySlug) {
            return this.httpClient.get(`categories/${categorySlug}/posts`, requestOptions)
                .pipe(
                    map((response: JsonApiResource<Category>) => {
                        if (!response.included) {
                            return {data: null, size, page, category: response.data};
                        }

                        const posts = response.included.filter((includedData: any) => {
                            return includedData.type === 'posts';
                        });

                        return {data: posts, size, page, category: response.data};
                    }),
                    this.handleError()
                );
        }

        return this.httpClient.get(`posts`, requestOptions)
            .pipe(
                map((response: JsonApiResources<Post>) => {
                    return {data: response.data, links: response.links, size, page, category: null};
                }),
                this.handleError()
            );
    }

    private handleError() {
        return catchError((error: any) => {
            console.error('Could not retrieve posts with error: ', error);
            this.notifications.error('Error', 'Could not retrieve posts');
            return Observable.of(null);
        });
    }
}