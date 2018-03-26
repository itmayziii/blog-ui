import {Component, Input} from '@angular/core';

@Component({
    selector: 'blog-loader',
    styleUrls: ['./loader.component.scss'],
    template: `
        <div class="loader-container">
            <div [style.font-size]="size" class="loader"></div>
        </div>
    `
})
export class LoaderComponent {
    @Input() public size: string = '90px';
}