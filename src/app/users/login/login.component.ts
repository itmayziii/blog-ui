import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Headers } from "@angular/http";
import { HttpService } from "../../services/http/http.service";
import { NotificationsService } from "angular2-notifications/dist";
import { Router } from "@angular/router";
import { RouteService } from "../../services/route.service";

@Component({
    selector: 'blog-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;

    public constructor(
        private formBuilder: FormBuilder,
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
                this.updateApiToken(results);

                const navigateToUrl = (this.routeService.redirectUrl) ? this.routeService.redirectUrl : '/blogs';
                this.router.navigate([navigateToUrl]);
            },
            (errorMessage: any) => {
                this.notifications.error('Login Failed', errorMessage.error);
                this.loginForm.enable();
            }
        )
    }

    private updateApiToken(results: any) {
        localStorage.setItem('API-Token', results["API-Token"]);
    }
}
