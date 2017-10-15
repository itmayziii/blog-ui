import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { WindowRef } from "../../utils/window-ref";

@Directive({
    selector: '[blogSlugify]',
    providers: [WindowRef]
})
export class SlugifyDirective {

    @Input() private blogSlugify;

    public constructor(private el: ElementRef, private windowRef: WindowRef) {}

    @HostListener('blur')
    public slugifyValue() {
        const elToPutSlug: HTMLInputElement = this.findElementToPutSlug();

        if (!elToPutSlug) {
            return;
        }

        const slugifiedValue = this.el.nativeElement.value
            .toLowerCase()
            .trim()
            .replace(/\s/g, '-');
        elToPutSlug.value = slugifiedValue;
    }

    private findElementToPutSlug(): HTMLInputElement {
        return this.windowRef.nativeWindow.document.getElementById(this.blogSlugify);
    }

}
