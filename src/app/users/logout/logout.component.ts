import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";

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

    public constructor(private userService: UserService) {

    }

    public ngOnInit() {
        this.userService.user = null;
        this.userService.userId = null;
        localStorage.removeItem('API-Token');
    }

}
