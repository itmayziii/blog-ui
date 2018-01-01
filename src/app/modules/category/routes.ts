import { Routes } from "@angular/router";
import { CategoryCreateComponent } from "./create/category-create.component";

export const routes: Routes = [
    {
        path: '',
        data: {
            'authorizedRole': 'Guest'
        },
        // canActivateChild: [AuthGuard],
        children: [
            {
                path: '',
                component: CategoryCreateComponent,
                data: {
                    'authorizedRole': 'Administrator'
                }
            }
        ]
    }
];