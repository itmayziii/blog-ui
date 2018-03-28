import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post';
import { catchError, flatMap } from 'rxjs/operators';
import 'rxjs/add/observable/empty';
import { JsonApiResource } from '../models/json-api/json-api-resource';
import { MarkdownService } from '../services/markdown.service';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/observable/merge';

interface PostResolverData {
    data: Post,
    parsedContent: string
}

@Injectable()
export class PostResolver implements Resolve<Observable<PostResolverData>> {
    public constructor(private httpClient: HttpClient, private markdownService: MarkdownService, private router: Router) {
    }

    public resolve(routeSnapshot: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot) {
        const postSlug = routeSnapshot.paramMap.get('slug');

        return this.httpClient.get(`posts/${postSlug}`)
            .pipe(
                flatMap((response: JsonApiResource<Post>) => {
                    return this.parseContent(response.data.attributes.content)
                        .pipe(
                            flatMap((parsedContent: string) => {
                                return Observable.of({
                                    data: response.data,
                                    parsedContent: parsedContent
                                })
                            })
                        )
                }),
                this.handleError()
            );
    }

    private parseContent(content): Observable<string> {
        return Observable.create((observer: Observer<string>) => {
            this.markdownService.parse(content, (error, parsedMarkdown) => {
                observer.next(parsedMarkdown);
                observer.complete();
            });
        });
    }

    private handleError() {
        return catchError((error: any) => {
            console.log('PostResolver: Could not resolve post with error ', error);
            this.router.navigate(['/not-found']);
            return Observable.of(null);
        });
    }
}