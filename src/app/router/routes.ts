import { Routes } from "@angular/router";
import { AuthGuard } from "../auth-guard/auth-guard.class";
import { ContactCreateFormComponent } from "../contact/create-form/contact-create-form.component";
import { NotFoundComponent } from "../not-found/not-found.component";
import { LoginComponent } from "../users/login/login.component";
import { RegisterComponent } from "../users/register/register.component";
import { ContactShowComponent } from "../contact/show/contact-show.component";
import { LogoutComponent } from "../users/logout/logout.component";
import { BlogListComponent } from "../blog/list/blog-list.component";
import { BlogShowComponent } from "../blog/show/blog-show.component";
import { BlogCreateComponent } from "../blog/create/blog-create.component";

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/blogs',
        pathMatch: 'full'
    },
    {
        path: 'blogs',
        data: {
            'authorizedRole': 'Guest'
        },
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'create',
                component: BlogCreateComponent,
                data: {
                    'authorizedRole': 'Administrator'
                }
            },
            {
                path: ':id',
                component: BlogShowComponent
            },
            {
                path: '',
                component: BlogListComponent
            }
        ]
    },
    {
        path: 'users',
        data: {
            'authorizedRole': 'Guest'
        },
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'register',
                component: RegisterComponent,
            },
            {
                path: 'logout',
                component: LogoutComponent
            }
        ]
    },
    {
        path: 'contacts',
        data: {
            'authorizedRole': 'Guest'
        },
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'create',
                component: ContactCreateFormComponent
            },
            {
                path: ':id',
                component: ContactShowComponent,
                data: {
                    'authorizedRole': 'Administrator'
                },
            },
            {
                path: '',
                component: ContactShowComponent, //TODO create contact list component
                data: {
                    'authorizedRole': 'Administrator'
                },
            }
        ]
    },
    {
        path: '**',
        component: NotFoundComponent
    },
];