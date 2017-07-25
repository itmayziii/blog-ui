import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpService } from "../../services/http/http.service";
import { Subscription } from "rxjs/Subscription";
import { EqualValidator } from "../../validators/equal-validator.directive";

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
        let equalValidator = new EqualValidator();
        this.registerForm = this.formBuilder.group({
            "first-name": [null, [Validators.required]],
            "last-name": [null, [Validators.required]],
            "email": [null, [Validators.required]],
            "password": [null, [Validators.required]],
            "password-confirmation": [null, [Validators.required, equalValidator.validate]]
        });
    }
}
