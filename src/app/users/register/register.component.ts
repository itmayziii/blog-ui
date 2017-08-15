import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { JsonApiService } from "../../services/http/json-api.service";
import { equalTo } from 'ng2-validation/dist/equal-to';
import { Headers } from "@angular/http";

@Component({
    selector: 'blog-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    public registerForm: FormGroup;

    public constructor(private formBuilder: FormBuilder, private jsonApi: JsonApiService) { }

    public ngOnInit(): void {
        this.createForm();
    }

    public onRegister(): void {
        const headers = new Headers({
            "Content-Type": "application/vnd.api+json",
            "Accept": "application/vnd.api+json"
        });
        this.jsonApi.post('users', this.registerForm.value, {headers: headers})
            .then((results) => {
                console.log(results);
            })
            .catch((error) => {
                console.log('an error occured ', error);
            });
    }

    public doPasswordsMatch(): boolean {
        const passwordConfirmationControl = this.registerForm.controls['password_confirmation'];

        // We will not determine if the passwords match unless the confirmation has been modified
        if (!passwordConfirmationControl.dirty) {
            return true;
        }

        if (!this.isPasswordConfirmationErrors(passwordConfirmationControl)) {
            return true;
        }

        return !passwordConfirmationControl.errors['equalTo'];
    }

    private createForm(): void {
        this.registerForm = this.formBuilder.group({
            "first-name": [null, [Validators.required]],
            "last-name": [null, [Validators.required]],
            "email": [null, [Validators.required, Validators.email]]
        });

        const passwordControl = this.formBuilder.control(null, [Validators.required]);
        const passwordConfirmationControl = this.formBuilder.control(null, [Validators.required, equalTo(passwordControl)]);
        this.registerForm.addControl('password', passwordControl);
        this.registerForm.addControl('password_confirmation', passwordConfirmationControl);
    }

    private isPasswordConfirmationErrors(passwordConfirmationFormControl: AbstractControl) {
        return (passwordConfirmationFormControl && passwordConfirmationFormControl.errors)
    }
}
