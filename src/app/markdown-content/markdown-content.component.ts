import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';
import { MarkdownService } from '../services/markdown.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'blog-markdown-content',
    template: `
        <div class="markdown-content row" [innerHTML]="content"></div>
    `,
    styleUrls: ['./markdown-content.component.scss']
})
export class MarkdownContentComponent implements OnInit, OnDestroy {
    @Input() public content$: Observable<string>;
    @Input() public parsedContent: string;
    private _contentSubscription: ISubscription;
    public content: SafeHtml;

    public constructor(private markdownService: MarkdownService, private sanitizer: DomSanitizer) {
    }

    public ngOnInit() {
        if (this.parsedContent) {
            this.content = this.sanitizer.bypassSecurityTrustHtml(this.parsedContent);
        }

        if (this.content$) {
            this._contentSubscription = this.content$.subscribe((content: string) => {
                this.parseMarkdown(content);
            });
        }
    }

    public ngOnDestroy() {
        if (this._contentSubscription) {
            this._contentSubscription.unsubscribe();
        }
    }

    private parseMarkdown(content) {
        this.markdownService.parse(content, (err, result) => {
            this.content = this.sanitizer.bypassSecurityTrustHtml(result);
        });
    }
}
