import { Component, Input } from '@angular/core';

@Component({
    selector: 'blog-input',
    template: `
    <label for="{{fieldName}}" class="input-label">{{fieldLabel}}</label>
    <ng-content select="input"></ng-content>
  `,
    styleUrls: ['./input.component.scss']
})
export class InputComponent {
    @Input() public fieldName: string = '';
    @Input() public fieldLabel: string = '';
}
