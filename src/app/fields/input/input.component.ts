import { AfterViewInit, Component, ElementRef, HostListener, Input } from '@angular/core';

// FIXME class is experimental
@Component({
    selector: 'blog-input',
    template: `
    <fieldset class="form-group" (click)="active = true">
        <label for="{{fieldName}}" class="input-label" [class.active]="active">{{fieldLabel}}</label>
        <ng-content  select="input"></ng-content>
    </fieldset>
  `,
    styleUrls: ['./input.component.scss']
})
export class InputComponent implements AfterViewInit {
    @Input() public fieldName: string = '';
    @Input() public fieldLabel: string = '';
    public active: boolean = false;
    private empty: boolean = true;
    private _input: HTMLInputElement;

    public constructor(private eref: ElementRef) {

    }

    ngAfterViewInit(): void {
        this.input = this.eref.nativeElement;
        this.checkIfEmpty();
    }

    public toggleActive(): void {
        this.active = !this.active && this.empty;
    }

    @HostListener('document:click', ['$event'])
    public onDocumentClick(event): void {
        let elementClicked = this.eref.nativeElement.contains(event.target);
        if (!elementClicked && this.active === true) {
            this.toggleActive();
        }
    }

    private checkIfEmpty(): void {
        this.empty = this.input.value.length > 0;
    }

    private makeSureInputExists(): void {
        let inputs = this.eref.nativeElement.getElementsByTagName('input');
        if (inputs.length !== 1) {
            throw new Error('There must be exactly 1 input per blog-input');
        }
    }

    get input(): HTMLInputElement {
        return this._input;
    }

    set input(element: HTMLInputElement) {
        this.makeSureInputExists();
        this._input = this.eref.nativeElement.getElementsByTagName('input')[0];
    }
}
