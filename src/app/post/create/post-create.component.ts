import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { JsonApiResources } from "../../models/json-api/json-api-resoures";
import { NotificationsService } from "angular2-notifications";
import { UserService } from "../../services/user.service";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Category } from "../../models/category";

@Component({
    selector: 'blog-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
    public postCreateForm: FormGroup;
    private _categories: Category[];
    @ViewChild('image') public image: ElementRef;

    public constructor(private formBuilder: FormBuilder,
                       private httpClient: HttpClient,
                       private notifications: NotificationsService,
                       private userService: UserService) {
    }

    public ngOnInit(): void {
        this.createForm();
        this.retrieveCategories();
    }

    private createForm(): void {
        this.postCreateForm = this.formBuilder.group({
            "title": [null, Validators.required],
            "slug": [null, Validators.required],
            "status": ['draft', Validators.required],
            "preview": null,
            "content": null,
            "category-id": [null, Validators.required],
            "user-id": [null, Validators.required],
            "image-path-sm": null,
            "image-path-md": null,
            "image-path-lg": null
        });

        this.postCreateForm.get('user-id').setValue(this.userService.userId);
    }

    public onSubmit(): void {
        this.createPost(this.postCreateForm.value);
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

    public get categories(): Category[] {
        return this._categories;
    }

    private createPost(post: object) {
        this.postCreateForm.disable();
        const createPostNotification = this.notifications.info('Creating Post', 'In Progress');

        this.httpClient.post('posts', post).subscribe(
            (response) => {
                this.postCreateForm.enable();
                this.notifications.remove(createPostNotification.id);
                this.notifications.success('Success', 'Post created');
            },
            (error) => {
                this.notifications.remove(createPostNotification.id);
                this.notifications.error('Error', 'Post could not be created')
            }
        )
    }
}