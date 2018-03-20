import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { JsonApiResources } from "../../models/json-api/json-api-resoures";
import { Post } from "../../models/post";
import { HttpClient, HttpParams } from "@angular/common/http";
import { JsonApiResource } from "../../models/json-api/json-api-resource";
import { Category } from "../../models/category";

@Injectable()
export class PostsResolver implements Resolve<Observable<any>> {
    public constructor(private httpClient: HttpClient) {}

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
            return this.httpClient.get(`categories/${categorySlug}/posts`).map((response: JsonApiResource<Category>) => {
                if (!response.included) {
                    return {data: null, size, page};
                }

                const posts = response.included.filter((includedData: any) => {
                    return includedData.type === 'posts';
                });

                return {data: posts, size, page};
            });
        }

        return this.httpClient.get(`posts`, requestOptions).map((response: JsonApiResources<Post>) => {
            return {data: response.data, links: response.links, size, page};
        });
    }
}