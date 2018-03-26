import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {JsonApiResources} from '../../models/json-api/json-api-resoures';
import {NotificationsService} from 'angular2-notifications';
import {UserService} from '../../services/user.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Category} from '../../models/category';
import {Post} from '../../models/post';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {JsonApiResource} from '../../models/json-api/json-api-resource';
import 'rxjs/add/observable/of';
import {ISubscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'blog-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit, OnDestroy {
    private _postForm: FormGroup;
    private _categories: Category[];
    private _post: Post;
    private _postSubscription: ISubscription;

    public constructor(private formBuilder: FormBuilder,
                       private httpClient: HttpClient,
                       private notifications: NotificationsService,
                       private userService: UserService,
                       private route: ActivatedRoute,
                       private router: Router) {
    }

    public ngOnInit(): void {
        this.retrieveCategories();
        this.createForm();
        this.retrievePost()
            .then(() => {
                this._postForm.setValue({
                    'title': this.post.attributes.title,
                    'slug': this.post.attributes.slug,
                    'status': this.post.attributes.status,
                    'preview': this.post.attributes.preview,
                    'content': this.post.attributes.content,
                    'category-id': this.post.attributes.categoryId,
                    'user-id': this.post.attributes.userId,
                    'image-path-sm': this.post.attributes.imagePathSm,
                    'image-path-md': this.post.attributes.imagePathMd,
                    'image-path-lg': this.post.attributes.imagePathLg,
                    'image-path-meta': this.post.attributes.imagePathMeta
                });
            })
            .catch(() => {
            });
    }

    public ngOnDestroy(): void {
        this._postSubscription.unsubscribe();
    }

    public onSubmit(): void {
        this.updateOrCreatePost(this._postForm.value);
    }

    private retrieveCategories(): void {
        this.httpClient.get('categories').subscribe(
            (response: JsonApiResources<Category>) => {
                this._categories = response.data;
            },
            (error: HttpErrorResponse) => {
                this.notifications.error('Error', 'Could not retrieve list of categories');
            }
        );
    }

    private createForm(): void {
        this._postForm = this.formBuilder.group({
            'title': [null, Validators.required],
            'slug': [null, Validators.required],
            'status': ['draft', Validators.required],
            'preview': null,
            'content': null,
            'category-id': [null, Validators.required],
            'user-id': [null, Validators.required],
            'image-path-sm': null,
            'image-path-md': null,
            'image-path-lg': null,
            'image-path-meta': null
        });

        this._postForm.get('user-id').setValue(this.userService.user.id);
    }

    private updateOrCreatePost(post: Post) {
        this._postForm.disable();
        const createPostNotification = this.notifications.info('Info', 'Saving Post');

        const method = (this._post) ? 'put' : 'post';
        const uri = (this._post) ? `posts/${this._post.attributes.slug}` : 'posts';
        this.httpClient[method](uri, post).subscribe(
            (response: JsonApiResource<Post>) => {
                this._postForm.enable();
                this.notifications.success('Success', 'Post saved');

                if (this.router.url !== `/posts/update/${response.data.attributes.slug}`) {
                    this.router.navigate([`/posts/update/${response.data.attributes.slug}`]);
                }
            },
            (error) => {
                this.notifications.error('Error', 'Post could not be saved')
            },
            () => {
                this.notifications.remove(createPostNotification.id);
            }
        )
    }

    private retrievePost(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const post$ = this.route.paramMap
                .switchMap((params: ParamMap) => {
                    const postSlug = params.get('slug');
                    if (!postSlug) {
                        Observable.throw('Slug parameter is not set');
                    }

                    return <Observable<JsonApiResource<Post>>> this.httpClient.get(`posts/${postSlug}`);
                });

            this._postSubscription = post$.subscribe(
                (response) => {
                    this._post = response.data;
                    resolve(true);
                },
                () => {
                    reject(false);
                }
            );
        });
    }

    public get categories(): Category[] {
        return this._categories;
    }

    public get postForm(): FormGroup {
        return this._postForm;
    }

    public get post(): Post {
        return this._post;
    }
}