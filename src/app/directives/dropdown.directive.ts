import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { WindowRef } from '../globals/window-ref';

@Directive({
    selector: '[dropdown]'
})
export class DropdownDirective {

    @Input() public dropdown;

    public constructor(private el: ElementRef, private windowRef: WindowRef) {
    }

    @HostListener('click')
    public onClick() {
        this.toggleDropdown();
    }

    private toggleDropdown() {
        if (!this.windowRef.nativeWindow) {
            return;
        }

        const dropdownOptionsEl = this.windowRef.nativeWindow.document.querySelector(`[data-dropdown="${this.dropdown}"]`);
        if (!dropdownOptionsEl) {
            console.error(`DropdownDirective: Could not find matching data-dropdown attribute with value ${this.dropdown}`);
            return;
        }

        dropdownOptionsEl.classList.toggle('show');
    }
}