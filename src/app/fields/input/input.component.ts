import { Component, ElementRef, HostListener, Input } from '@angular/core';

@Component({
    selector: 'blog-input',
    template: `
    <fieldset class="form-group" (click)="active = true" (keyup.tab)="toggleActive()">
        <label for="{{fieldName}}" class="input-label" [class.active]="active">{{fieldLabel}}</label>
        <ng-content select="input"></ng-content>
    </fieldset>
  `,
    styleUrls: ['./input.component.scss']
})
export class InputComponent {
    @Input() public fieldName: string = '';
    @Input() public fieldLabel: string = '';
    public active: boolean = false;

    public constructor(private eref: ElementRef) {

    }

    public toggleActive() {
        this.active = !this.active;
    }

    @HostListener('document:click', ['$event'])
    public onDocumentClick(event) {
        let elementClicked = this.eref.nativeElement.contains(event.target);
        if (!elementClicked && this.active === true) {
            this.toggleActive();
        }
    }
}
