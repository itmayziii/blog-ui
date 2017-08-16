import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Http, Headers } from "@angular/http";
import { HttpService } from "../../services/http/http.service";

@Component({
    selector: 'blog-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;

    public constructor(private formBuilder: FormBuilder, private httpService: HttpService) {}

    public ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            "email": [null, [Validators.required, Validators.email]],
            "password": [null, [Validators.required]]
        });
    }

    public onSubmit(): void {
        const headers = new Headers({
            Authorization: `Bearer ${this.loginForm.get('email').value}`
        });
        this.httpService.get('/authenticate', {headers: headers}).then((results) => {
            console.log(results);
        })
    }
}
