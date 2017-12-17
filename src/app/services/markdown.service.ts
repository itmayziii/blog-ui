import { Injectable } from '@angular/core';
import * as marked from 'marked';
import { MarkedOptions, Renderer } from "marked";
import { HighlightService } from "./highlight.service";

@Injectable()
export class MarkdownService {

    public constructor(private highlightService: HighlightService) {}

    public parse(src, callback): string {
        const renderer = this.createMarkedRenderer();
        const markedOptions: MarkedOptions = {renderer: renderer, highlight: this.highlightService.highlight};
        return marked(src, markedOptions, (err, result) => {
            callback(err, result.toString());
        });
    }

    private createMarkedRenderer(): Renderer {
        const renderer: Renderer = new marked.Renderer();
        renderer.heading = function (text, level): string {
            return `<h${level} class="blog-content-heading-${level} w-100 text-secondary text-center">${text}</h${level}>`;
        };

        renderer.paragraph = function (text): string {
            return `<p class="w-100 text-white">${text}</p>`
        };

        renderer.code = function (code, language, isEscaped): string {
            return `<pre class="bg-light p-3 rounded w-100"><code class="w-100">${code}</code></pre>`
        };

        return renderer;
    }

    // private highlight(code: string, language: string, callback?: { (error: any, code: string): void }): void {
    //     const highlightedCode = this.highlightService.highlight(code, language, callback);
    //     callback('', highlightedCode.value);
    // }
}