import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpService } from "../../services/http/http.service";
import { equalTo } from 'ng2-validation/dist/equal-to';

@Component({
    selector: 'blog-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    public registerForm: FormGroup;

    public constructor(private formBuilder: FormBuilder, private http: HttpService) { }

    public ngOnInit(): void {
        this.createForm();
    }

    public onRegister() {

    }

    private createForm() {
        this.registerForm = this.formBuilder.group({
            "first-name": [null, [Validators.required]],
            "last-name": [null, [Validators.required]],
            "email": [null, [Validators.required]]
        });

        const passwordControl = this.formBuilder.control(null, [Validators.required]);
        const passwordConfirmationControl = this.formBuilder.control(null, [Validators.required, equalTo(passwordControl)]);
        this.registerForm.addControl('password', passwordControl);
        this.registerForm.addControl('password-confirmation', passwordConfirmationControl);
    }
}
