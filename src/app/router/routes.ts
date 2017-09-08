import { Routes } from "@angular/router";
import { AuthGuard } from "../auth-guard/auth-guard.class";
import { ContactCreateFormComponent } from "../contact/create-form/contact-create-form.component";
import { NotFoundComponent } from "../not-found/not-found.component";
import { LoginComponent } from "../users/login/login.component";
import { RegisterComponent } from "../users/register/register.component";
import { ContactShowComponent } from "../contact/show/contact-show.component";
import { LogoutComponent } from "../users/logout/logout.component";

export const routes: Routes = [
    {
        path: '',
        component: RegisterComponent
    },
    {
        path: 'users',
        children: [
            {
                path: 'login',
                component: LoginComponent,
            },
            {
                path: 'register',
                component: RegisterComponent
            },
            {
                path: 'logout',
                component: LogoutComponent
            }
        ]
    },
    {
        path: 'contacts',
        children: [
            {
                path: 'create',
                component: ContactCreateFormComponent
            },
            {
                canActivate: [AuthGuard],
                path: ':id',
                component: ContactShowComponent
            },
            {
                canActivate: [AuthGuard],
                path: '',
                component: ContactShowComponent
            },
        ]
    },
    {
        path: '**',
        component: NotFoundComponent
    },
];