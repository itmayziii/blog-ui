import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'tm3-contact-create-form',
    templateUrl: './create-form.component.html',
    styleUrls: ['./create-form.component.scss']
})
export class ContactCreateFormComponent {
    private contactCreateForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        this.createForm();
    }

    private createForm() {
        this.contactCreateForm = this.formBuilder.group({
            "first-name": this.formBuilder.control(null),
            "last-name": this.formBuilder.control(null),
            "email": this.formBuilder.control(null),
            "comments": this.formBuilder.control(null)
        })
    }

    private onSubmit() {
        console.log(this.contactCreateForm.value);
    }
}
