import { Routes } from "@angular/router";
import { AuthGuard } from "./auth-guard/auth-guard.class";
import { ContactCreateComponent } from "./contact/create/contact-create.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { LoginComponent } from "./users/login/login.component";
import { RegisterComponent } from "./users/register/register.component";
import { ContactShowComponent } from "./contact/show/contact-show.component";
import { LogoutComponent } from "./users/logout/logout.component";
import { PostListComponent } from "./post/list/post-list.component";
import { PostShowComponent } from "./post/show/post-show.component";
import { PostCreateComponent } from "./post/create/post-create.component";
import { FileUploadComponent } from "./file/upload/file-upload.component";

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/posts',
        pathMatch: 'full'
    },
    {
        path: 'posts',
        data: {
            'authorizedRole': 'Guest'
        },
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'create',
                component: PostCreateComponent,
                data: {
                    'authorizedRole': 'Administrator'
                }
            },
            {
                path: ':slug',
                component: PostShowComponent
            },
            {
                path: 'update/:slug',
                component: PostCreateComponent,
                data: {
                    'authorizedRole': 'Administrator'
                }
            },
            {
                path: '',
                component: PostListComponent
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
                component: ContactCreateComponent
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
        path: 'categories',
        data: {
            'authorizedRole': 'Guest'
        },
        canActivateChild: [AuthGuard],
        children: [
            {
                path: ':categorySlug/posts',
                component: PostListComponent
            },
            {
                path: '',
                data: {
                    'resourceType': 'categories',
                    'authorizedRole': 'Administrator'
                },
                canLoad: [AuthGuard],
                loadChildren: 'app/general-resource/general-resource.module#GeneralResourceModule'
            }
        ],
    },
    {
        path: 'files',
        data: {
            'authorizedRole': 'Administrator'
        },
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'upload',
                component: FileUploadComponent
            },
            {
                path: '',
                component: NotFoundComponent
            }
        ]
    },
    {
        path: 'access-denied', // TODO create access denied component
        component: NotFoundComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    },
];