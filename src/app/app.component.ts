import { Component } from '@angular/core';

@Component({
    selector: 'blog-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public notificationOptions = {
        position: ["bottom", "left"],
        timeOut: 10000,
        lastOnBottom: true
    }
}
