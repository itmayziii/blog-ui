import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Headers } from "@angular/http";
import { HttpService } from "../../services/http/http.service";
import { NotificationsService } from "angular2-notifications";
import { Router } from "@angular/router";
import { RouteService } from "../../services/route.service";

@Component({
    selector: 'blog-login',
    template: `
        <div class="container-fluid">
            <div class="row justify-content-center">
                <form [formGroup]="loginForm" (ngSubmit)="onLogin()" class="col-6 login-form" novalidate>
                    <fieldset class="form-group">
                        <label for="email">Email Address<span class="required">*</span></label>
                        <input type="email" id="email" formControlName="email" class="form-control">
                    </fieldset>

                    <fieldset class="form-group">
                        <label for="password">Password<span class="required">*</span></label>
                        <input type="password" id="password" formControlName="password" class="form-control">
                    </fieldset>

                    <button type="submit" class="btn btn-primary" [disabled]="!loginForm.valid">Login</button>
                    <button type="button" class="btn btn-info" routerLink="/users/register">Register</button>
                </form>
            </div>
        </div>
    `,
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;

    public constructor(private formBuilder: FormBuilder,
                       private httpService: HttpService,
                       private notifications: NotificationsService,
                       private router: Router,
                       private routeService: RouteService) {}

    public ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            "email": [null, [Validators.required, Validators.email]],
            "password": [null, [Validators.required]]
        });
    }

    public onLogin(): void {
        this.loginForm.disable();

        const headers = new Headers({
            Authorization: `Basic ${this.loginForm.get('email').value}:${this.loginForm.get('password').value}`
        });
        this.httpService.get('authenticate', {headers: headers}).subscribe(
            (results: any) => {
                localStorage.setItem('API-Token', results["API-Token"]);

                const navigateToUrl = (this.routeService.redirectUrl) ? this.routeService.redirectUrl : '/posts';
                this.router.navigate([navigateToUrl]).then(() => {});
            },
            (errorMessage: any) => {
                this.notifications.error('Login Failed', errorMessage.error);
                this.loginForm.enable();
            }
        )
    }
}
