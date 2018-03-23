import { Component, ElementRef, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationsService } from "angular2-notifications";
import { FileUploadService } from "../../services/http/file-upload.service";

@Component({
    selector: 'blog-file-upload',
    templateUrl: './file-upload.component.html'
})
export class FileUploadComponent {
    public fileUploadForm: FormGroup;
    @ViewChild('images') public images: ElementRef;

    public constructor(private notifications: NotificationsService, private fileUploadService: FileUploadService, private formBuilder: FormBuilder,) {
        this.createForm();
    }

    public onSubmit(): any {
        if (this.images.nativeElement.files.length > 0) {
            this.notifications.info('Uploading Files', 'In Progress');
            this.fileUploadService.uploadFiles(this.images).subscribe(
                (filesUploaded: string) => {
                    this.notifications.success('Success', 'Files successfully uploaded');
                },
                (error) => {
                    // console.error(`Failed to upload file with error ${error}`);
                    this.notifications.error('Error', 'Failed to upload files');
                }
            );
            return;
        }

        this.notifications.error('Error', 'No files selected to upload');
    }

    private createForm() {
        this.fileUploadForm = this.formBuilder.group({});
    }
}
