import { Injectable } from '@angular/core';
import { HighlightJs } from "../globals/highlight";

@Injectable()
export class HighlightService {

    public constructor() { }

    public highlight(code: string, language: string, callback?: { (error: any, code: string): void }): string {
        const highlightedCode = HighlightJs.getInstance().highlight(language, code);
        callback(null, highlightedCode.value);
        return highlightedCode.value;
    }

}
