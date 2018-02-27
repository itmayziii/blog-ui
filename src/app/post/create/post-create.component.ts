import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { JsonApiResourceObject } from "../../models/json-api/json-api-resource-object";
import { JsonApiResources } from "../../models/json-api/json-api-resoures";
import { NotificationsService } from "angular2-notifications";
import { UserService } from "../../services/user.service";
import { FileUploadService } from "../../services/http/file-upload.service";
import { HttpClient } from "@angular/common/http";
import { Category } from "../../models/category";

@Component({
    selector: 'blog-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
    public postCreateForm: FormGroup;
    private _categories: JsonApiResourceObject[];
    @ViewChild('image') public image: ElementRef;

    public constructor(private formBuilder: FormBuilder,
                       private httpClient: HttpClient,
                       private notifications: NotificationsService,
                       private userService: UserService,
                       private fileUploadService: FileUploadService) {
    }

    public ngOnInit(): void {
        this.createForm();
        this.retrieveCategories();
    }

    private createForm(): void {
        this.postCreateForm = this.formBuilder.group({
            "title": [null, Validators.required],
            "slug": [null, Validators.required],
            "content": [null, Validators.required],
            "category-id": [null, Validators.required],
            "user-id": null
        });

        this.postCreateForm.get('user-id').setValue(this.userService.userId);
    }

    public onSubmit(): void {
        this.postCreateForm.disable();
        this.notifications.info('Creating Post', 'In Progress');

        if (this.image.nativeElement.files.length > 0) {
            this.fileUploadService.uploadFile(this.image).subscribe((filesUploaded) => {
                if (!filesUploaded) {
                    this.notifications.error('Creating Post', 'Failed to upload image');
                    return;
                }

                let formValues = this.postCreateForm.value;
                formValues['image-path'] = filesUploaded[0];
                this.createPost(formValues);
            });
        } else {
            this.createPost(this.postCreateForm.value);
        }
    }

    private retrieveCategories(): void {
        this.httpClient.get('categories').subscribe(
            (response: JsonApiResources<Category>) => {
                this._categories = response.data;
            },
            (error: any) => {
                this.notifications.error('Error', 'Could not retrieve list of categories');
            }
        )
    }

    public get categories(): JsonApiResourceObject[] {
        return this._categories;
    }

    private createPost(post: object) {
        this.httpClient.post('posts', post).subscribe(
            (response) => {
                this.postCreateForm.reset();
                this.postCreateForm.enable();
                this.notifications.success('Success', 'Post created');
            },
            (error) => {
                this.notifications.error('Error', 'Post could not be created')
            }
        )
    }
}