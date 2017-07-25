import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from "../../services/http/http.service";
import { NotificationsService } from "angular2-notifications/dist";

@Component({
    selector: 'blog-contact-create-form',
    templateUrl: './contact-create-form.component.html',
    styleUrls: ['./contact-create-form.component.scss']
})
export class ContactCreateFormComponent {
    public contactCreateForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private httpService: HttpService, private notifications: NotificationsService) {
        this.createForm();
    }

    private createForm() {
        this.contactCreateForm = this.formBuilder.group({
            "first-name": null,
            "last-name": null,
            "email": null,
            "comments": [null, [Validators.required]]
        })
    }

    public onSubmit() {
        this.contactCreateForm.disable();
        this.httpService.post('contacts', this.contactCreateForm.value)
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
