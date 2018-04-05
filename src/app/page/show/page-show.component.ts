import { Component, OnInit } from '@angular/core';
import { Page } from '../../models/page';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'blog-page-show',
    template: `
        <div class="container-fluid">
            <div class="row justify-content-center">

                <h1 class="page-title">{{ page.attributes.title }}</h1>
                <div class="col-12">
                    <blog-markdown-content [parsedContent]="content"></blog-markdown-content>
                </div>

            </div>
        </div>
    `,
    styleUrls: ['./page-show.component.scss']
})
export class PageShowComponent implements OnInit {
    private _page: Page;
    public content: string;

    public constructor(private route: ActivatedRoute) {
    }

    public ngOnInit() {
        this.readRouteData();
    }

    private readRouteData(): void {
        this._page = this.route.snapshot.data.page.data;
        this.content = this.route.snapshot.data.page.parsedContent;
    }

    public get page(): Page {
        return this._page;
    }
}
