import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { routes } from "./routes";
import { CategoryCreateComponent } from './create/category-create.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    declarations: [CategoryCreateComponent]
})
export class CategoryModule {
}
