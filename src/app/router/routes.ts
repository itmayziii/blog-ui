import { Routes } from "@angular/router";
import { AuthGuard } from "../auth-guard/auth-guard.class";
import { ContactCreateFormComponent } from "../contact/create-form/contact-create-form.component";
import { NotFoundComponent } from "../not-found/not-found.component";
import { LoginComponent } from "../login/login.component";

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'contacts',
        children: [
            // {
            //     path: '',
            //     component: ContactListComponent
            // },
            // {
            //     path: ':id',
            //     component: ContactShowComponent
            // }
            {
                canActivate: [AuthGuard],
                path: 'create',
                component: ContactCreateFormComponent
            }
        ]
    },
    {
        canActivate: [AuthGuard],
        path: 'contacts/create',
        component: ContactCreateFormComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    },
];