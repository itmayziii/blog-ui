import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JsonApiService } from "../../services/json-api/json-api.service";

@Component({
    selector: 'tm3-contact-create-form',
    templateUrl: './create-form.component.html',
    styleUrls: ['./create-form.component.scss']
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
        console.log(this.contactCreateForm.value);
        this.jsonApi.get();
    }
}
