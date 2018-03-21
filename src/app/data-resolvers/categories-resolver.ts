import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from "@angular/common/http";
import { JsonApiResources } from "../models/json-api/json-api-resoures";
import { Category } from "../models/category";

interface CategoryListData {
    data: Category[]
}

@Injectable()
export class CategoriesResolver implements Resolve<Observable<CategoryListData>> {
    public constructor(private httpClient: HttpClient) {}

    public resolve(routeSnapshot: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot) {
        return this.httpClient.get('categories').map((response: JsonApiResources<Category>) => {
                return {data: response.data};
            }
        )
    }
}