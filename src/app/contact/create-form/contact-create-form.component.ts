import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JsonApiService } from "../../services/json-api/json-api.service";

@Component({
    selector: 'blog-contact-create-form',
    templateUrl: './contact-create-form.component.html',
    styleUrls: ['./contact-create-form.component.scss']
})
export class ContactCreateFormComponent {
    private contactCreateForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private jsonApi: JsonApiService) {
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

    private onSubmit() {
        this.contactCreateForm.disable();
        this.jsonApi.post('contacts', this.contactCreateForm.value)
            .then((results) => {
                this.contactCreateForm.reset();
                this.contactCreateForm.enable();
                console.log('success!!!');
                // this.alert.success(); // TODO create alert class to show general system alerts
            })
            .catch((error: any) => {
                console.log('there was a problem'); // TODO give a notifaction on failure
            });

    }
}
