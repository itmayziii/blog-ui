import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { JsonApiResourceObject } from "../../models/json-api/json-api-resource-object";
import { JsonApiService } from "../../services/http/json-api.service";
import { JsonApiResources } from "../../models/json-api/json-api-resoures";
import { NotificationsService } from "angular2-notifications/dist";
import { UserService } from "../../services/user.service";
import { HttpService } from "../../services/http/http.service";
import { FileUploadService } from "../../services/http/file-upload.service";

@Component({
    selector: 'blog-blog-create',
    templateUrl: './blog-create.component.html',
    styleUrls: ['./blog-create.component.scss']
})
export class BlogCreateComponent implements OnInit {
    public blogCreateForm: FormGroup;
    private _categories: JsonApiResourceObject[];
    @ViewChild('image') public image: ElementRef;

    public constructor(private formBuilder: FormBuilder,
                       private jsonApi: JsonApiService,
                       private notifications: NotificationsService,
                       private userService: UserService,
                       private http: HttpService,
                       private fileUploadService: FileUploadService) {
    }

    public ngOnInit(): void {
        this.createForm();
        this.retrieveCategories();
    }

    private createForm(): void {
        this.blogCreateForm = this.formBuilder.group({
            "title": [null, Validators.required],
            "slug": [null, Validators.required],
            "content": [null, Validators.required],
            "category-id": [null, Validators.required],
            "user-id": null
        });

        this.blogCreateForm.get('user-id').setValue(this.userService.userId);
    }

    public onSubmit(): void {
        this.blogCreateForm.disable();
        this.notifications.info('Creating Blog', 'In Progress');

        if (this.image.nativeElement.files.length > 0) {
            this.fileUploadService.uploadFile(this.image).subscribe((filesUploaded) => {
                if (!filesUploaded) {
                    this.notifications.error('Creating Blog', 'Failed to upload image');
                    return;
                }

                let formValues = this.blogCreateForm.value;
                formValues['image-path'] = filesUploaded[0];
                this.createBlog(formValues);
            });
        } else {
            this.createBlog(this.blogCreateForm.value);
        }
    }

    private retrieveCategories(): void {
        this.jsonApi.get('categories').subscribe(
            (response: JsonApiResources) => {
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

    private createBlog(blog: object) {
        this.jsonApi.post('blogs', blog).subscribe(
            (response) => {
                this.blogCreateForm.reset();
                this.blogCreateForm.enable();
                this.notifications.success('Success', 'Blog created');
            },
            (error) => {
                this.notifications.error('Error', 'Blog could not be created')
            }
        )
    }
}