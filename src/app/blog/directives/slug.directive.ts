import { Directive, HostListener, ViewChildren } from '@angular/core';
import { SlugTitleDirective } from "./slug-title.directive";

@Directive({
    selector: '[blogSlug]'
})
export class SlugDirective {

    public constructor() { }

    @ViewChildren(SlugTitleDirective) blah;

    @HostListener('blur')
    public onblur() {
        console.log(this.blah);
    }

}
