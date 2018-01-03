import { Routes } from "@angular/router";
import { AuthGuard } from "../auth-guard/auth-guard.class";
import { CategoryComponent } from "./category.component";

export const routes: Routes = [
    {
        path: 'categories',
        data: {
            'authorizedRole': 'Administrator'
        },
        canActivateChild: [AuthGuard],
        children: [
            {
                path: '',
                component: CategoryComponent
            }
        ]
    }
];