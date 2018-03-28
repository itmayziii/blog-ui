import { Injectable } from '@angular/core';
import * as hljs from '../../../highlight.js/build/highlight.pack';

@Injectable()
export class HighlightJs {
    public static getInstance(): any {
        return hljs;
    }
}