import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { WindowRef } from "../../globals/window-ref";
import { PostCreateComponent } from "../create/post-create.component";

@Directive({
    selector: '[postSlugify]',
    providers: [WindowRef]
})
export class SlugifyDirective {

    @Input() private blogSlugify;

    public constructor(private el: ElementRef, private host: PostCreateComponent) {}

    @HostListener('blur')
    public slugifyValue() {
        if (this.host.postForm.get('slug').value !== '') {
            return;
        }

        const slugifiedValue = this.el.nativeElement.value
            .toLowerCase()
            .trim()
            .replace(/\s/g, '-');

        this.host.postForm.get('slug').setValue(slugifiedValue);
    }
}