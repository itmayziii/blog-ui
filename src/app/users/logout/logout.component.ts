import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: 'blog-logout',
    styleUrls: ['./logout.component.scss'],
    template: `
        <div class="container-fluid">
            <div class="row justify-content-center">

                <h1 class="col-12 text-success text-center logout-title">You Are Logged Out</h1>

            </div>
        </div>
    `
})
export class LogoutComponent implements OnInit {

    public constructor(private userService: UserService, private http: HttpClient) {

    }

    public ngOnInit() {
        this.userService.user = null;
        this.http.delete('logout').subscribe(
            () => {

            },
            () => {

            }
        )
    }

}
