import { Injectable } from '@angular/core';
import * as marked from 'marked';
import { MarkedOptions, Renderer } from 'marked';
import { HighlightService } from "./highlight.service";

@Injectable()
export class MarkdownService {

    public constructor(private highlightService: HighlightService) {}

    public parse(src, callback): string {
        const renderer = this.createMarkedRenderer();
        const markedOptions: MarkedOptions = {renderer: renderer, highlight: this.highlightService.highlight};
        return marked(src, markedOptions, (err, result) => {
            const markedString = (result) ? result.toString() : '';
            callback(err, markedString);
        });
    }

    private createMarkedRenderer(): Renderer {
        const renderer: Renderer = new marked.Renderer();
        renderer.heading = function (text, level): string {
            return `<h${level} class="blog-content-heading-${level} col-12 text-secondary text-center">${text}</h${level}>`;
        };

        renderer.paragraph = function (text): string {
            return `<p class="col-12 text-white">${text}</p>`
        };

        renderer.code = function (code, language, isEscaped): string {
            return `<pre class="bg-light p-3 rounded col-12"><code>${code}</code></pre>`
        };

        return renderer;
    }
}