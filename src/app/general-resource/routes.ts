import { Routes } from "@angular/router";
import { GeneralResourceComponent } from "./general-resource.component";

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: GeneralResourceComponent
            }
        ]
    }
];