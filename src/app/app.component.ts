import { Component } from '@angular/core';
import "rxjs/add/operator/filter";
import { AuthService } from "./services/auth.service";

@Component({
    selector: 'blog-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public notificationOptions = {
        position: ["bottom", "left"],
        timeOut: 5000,
        lastOnBottom: true,
        theClass: 'bg-primary'
    };

    public constructor(private authService: AuthService) {}
}
