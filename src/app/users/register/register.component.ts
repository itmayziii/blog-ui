import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { JsonApiService } from "../../services/http/json-api.service";
import { equalTo } from 'ng2-validation/dist/equal-to';
import { NotificationsService } from "angular2-notifications/dist";
import { JsonApiErrors } from "../../models/json-api/json-api-errors";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";

@Component({
    selector: 'blog-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    public registerForm: FormGroup;

    public constructor(
        private formBuilder: FormBuilder,
        private jsonApi: JsonApiService,
        private notifications: NotificationsService,
        private router: Router) { }

    public ngOnInit(): void {
        this.createForm();
    }

    public onRegister(): void {
        this.jsonApi.post('users', this.registerForm.value)
            .catch((error: JsonApiErrors) => {
                this.notifications.error(error.errors.title, error.errors.source.email[0]);
                return Observable.create('error tommy');
            })
            .subscribe((response: Response) => {
                // TODO open the users page
                this.router.navigate([`/users/putIDHere`]);
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
