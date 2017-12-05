import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { JsonApiResourceObject } from "../../models/json-api/json-api-resource-object";
import { JsonApiService } from "../../services/http/json-api.service";
import { JsonApiResources } from "../../models/json-api/json-api-resoures";
import { NotificationsService } from "angular2-notifications/dist";
import { UserService } from "../../services/user.service";
import { HttpService } from "../../services/http/http.service";
import { RequestOptions, Headers } from "@angular/http";
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
        this.notifications.info('Creating Blog', 'In Progress');
        this.fileUploadService.uploadFile(this.image).subscribe((fileUploaded) => {
            if (!fileUploaded) {
                this.notifications.error('Creating Blog', 'Failed to upload image');
                return;
            }

            console.log(fileUploaded);
        });

        // this.jsonApi.post('blogs', this.blogCreateForm.value).subscribe(
        //     (response) => {
        //         console.log(response);
        //         this.uploadImage();
        //     }
        // )
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
}