import { Directive, ElementRef, HostListener, Injectable, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";

@Injectable()
@Directive({
    selector: '[blogSlugTitle]'
})
export class SlugTitleDirective {
    public onTitleChange: Observable<string>;

    public constructor(private el: ElementRef) {}


    @HostListener('blug')
    public listenToTitleChange(event) {
        console.log('title blug', event);
    }
}
