import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NotificationsService } from "angular2-notifications";
import { Router } from "@angular/router";
import { RouteService } from "../../services/route.service";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { JsonApiResource } from "../../models/json-api/json-api-resource";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";

@Component({
    selector: 'blog-login',
    template: `
        <div class="container-fluid">
            <div class="row justify-content-center align-items-center">
                <form [formGroup]="loginForm" (ngSubmit)="onLogin()" class="col-12 col-md-6 login-form" novalidate>
                    <div class="row justify-content-center">
                        <fieldset class="form-group col-12">
                            <label for="email">Email Address<span class="required">*</span></label>
                            <input type="email" id="email" formControlName="email" class="form-control">
                        </fieldset>

                        <fieldset class="form-group col-12">
                            <label for="password">Password<span class="required">*</span></label>
                            <input type="password" id="password" formControlName="password" class="form-control">
                        </fieldset>

                        <button type="submit" class="btn btn-secondary col-8 col-md-3" [disabled]="!loginForm.valid">Login</button>
                        <button type="button" class="btn btn-outline-info col-8 col-md-3" routerLink="/users/register">Register</button>
                    </div>
                </form>
            </div>
        </div>
    `,
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;

    public constructor(private formBuilder: FormBuilder,
                       private httpClient: HttpClient,
                       private notifications: NotificationsService,
                       private router: Router,
                       private routeService: RouteService,
                       private userService: UserService) {}

    public ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            "email": [null, [Validators.required, Validators.email]],
            "password": [null, [Validators.required]]
        });
    }

    public onLogin(): void {
        this.loginForm.disable();

        const credentials = btoa(`${this.loginForm.get('email').value}:${this.loginForm.get('password').value}`);
        const headers = new HttpHeaders({
            Authorization: `Basic ${credentials}`
        });
        this.httpClient.post('authenticate', null, {headers: headers, withCredentials: true}).subscribe(
            (response: JsonApiResource<User>) => {
                this.userService.user = response.data;
                const navigateToUrl = (this.routeService.redirectUrl) ? this.routeService.redirectUrl : '/posts';
                this.router.navigate([navigateToUrl]).then(() => {});
            },
            (response: HttpErrorResponse) => {
                this.notifications.error('Login Failed', response.error.error);
                this.loginForm.enable();
            }
        )
    }
}
