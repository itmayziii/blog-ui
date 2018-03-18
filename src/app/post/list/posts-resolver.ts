import { Injectable } from '@angular/core';
import { ActivatedRoute, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { JsonApiResources } from "../../models/json-api/json-api-resoures";
import { Post } from "../../models/post";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class PostsResolver implements Resolve<Observable<any>> {
    public constructor(private route: ActivatedRoute, private http: HttpClient) {}

    public resolve() {
        return this.http.get('posts').map((response: Observable<JsonApiResources<Post>>) => {
            return response;
        });
    }
}