import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { WindowRef } from "../../globals/window-ref";
import { BlogCreateComponent } from "../create/blog-create.component";

@Directive({
    selector: '[blogSlugify]',
    providers: [WindowRef]
})
export class SlugifyDirective {

    @Input() private blogSlugify;

    public constructor(private el: ElementRef, private host: BlogCreateComponent) {}

    @HostListener('blur')
    public slugifyValue() {
        const slugifiedValue = this.el.nativeElement.value
            .toLowerCase()
            .trim()
            .replace(/\s/g, '-');
        this.host.blogCreateForm.get('slug').setValue(slugifiedValue);
    }
}