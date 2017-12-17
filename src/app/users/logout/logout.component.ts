import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'blog-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

    public ngOnInit() {
        localStorage.removeItem('API-Token');
    }

}
