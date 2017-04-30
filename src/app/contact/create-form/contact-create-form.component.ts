import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JsonApiService } from "../../services/json-api/json-api.service";
import { NotificationsService } from "angular2-notifications/dist";

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

    private createForm() {
        this.contactCreateForm = this.formBuilder.group({
            "first-name": this.formBuilder.control(null),
            "last-name": this.formBuilder.control(null),
            "email": this.formBuilder.control(null),
            "comments": this.formBuilder.control(null, Validators.required)
        })
    }

    public onSubmit() {
        this.contactCreateForm.disable();
        this.jsonApi.post('contacts', this.contactCreateForm.value)
            .then((results) => {
                this.notifications.success('Thank you for your submission!');
                this.contactCreateForm.reset();
                this.contactCreateForm.enable();
            })
            .catch((error: any) => {
                this.notifications.error('There was a problem! Please try again later');
                this.contactCreateForm.enable();
            });
    }
}
