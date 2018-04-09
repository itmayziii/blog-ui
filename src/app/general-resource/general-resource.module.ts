import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { GeneralResourceComponent } from './general-resource.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GeneralResourceListComponent } from './list/general-resource-list.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule
    ],
    declarations: [
        GeneralResourceComponent,
        GeneralResourceListComponent
    ]
})
export class GeneralResourceModule {
}
