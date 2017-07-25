import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'blog-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;

    public constructor(private fb: FormBuilder) {

    }

    public ngOnInit(): void {
        this.loginForm = this.fb.group({
            "email": [null, [Validators.required, Validators.email]],
            "password": [null, [Validators.required]]
        });
    }

    public onSubmit(): void {

    }
}
