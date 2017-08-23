import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JsonApiService } from "../../services/http/json-api.service";
import { NotificationsService } from "angular2-notifications/dist";
import 'rxjs/add/operator/catch';

@Component({
    selector: 'blog-contact-create-form',
    templateUrl: './contact-create-form.component.html',
    styleUrls: ['./contact-create-form.component.scss']
})
export class ContactCreateFormComponent {
    public contactCreateForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private jsonApi: JsonApiService, private notifications: NotificationsService) {
        this.createForm();
    }

    private createForm(): void {
        this.contactCreateForm = this.formBuilder.group({
            "first-name": null,
            "last-name": null,
            "email": null,
            "comments": [null, [Validators.required]]
        })
    }

    public onSubmit(): void {
        this.contactCreateForm.disable();
        this.jsonApi.post('contacts', this.contactCreateForm.value).subscribe(
            (response: any) => {
                console.log('in subscription');
                this.notifications.success('Success', 'Thank you for your submission!');
                this.contactCreateForm.reset();
                this.contactCreateForm.enable();
            },
            (error: any) => {
                this.notifications.error('Error', 'There was a problem! Please try again later');
                this.contactCreateForm.enable();
            }
        );
    }
}
