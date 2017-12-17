import { Injectable } from '@angular/core';

declare var hljs: any; // the highlight.js window reference

function _highlight(): any {
    return hljs;
}

@Injectable()
export class HighlightJs {
    public static getInstance(): any {
        return _highlight();
    }
}