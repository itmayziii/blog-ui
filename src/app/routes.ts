import { Routes } from '@angular/router';
import { AuthGuard } from './auth-guard/auth-guard.class';
import { ContactCreateComponent } from './contact/create/contact-create.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './users/login/login.component';
import { RegisterComponent } from './users/register/register.component';
import { ContactShowComponent } from './contact/show/contact-show.component';
import { LogoutComponent } from './users/logout/logout.component';
import { PostListComponent } from './post/list/post-list.component';
import { PostShowComponent } from './post/show/post-show.component';
import { PostCreateComponent } from './post/create/post-create.component';
import { FileUploadComponent } from './file/upload/file-upload.component';
import { PostsResolver } from './data-resolvers/posts-resolver';
import { CategoriesResolver } from './data-resolvers/categories-resolver';
import { PostResolver } from './data-resolvers/post-resolver';
import { PageShowComponent } from './page/show/page-show.component';
import { PageResolver } from './data-resolvers/page-resolver';

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
                component: PostShowComponent,
                resolve: {
                    post: PostResolver
                }
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
                component: PostListComponent,
                resolve: {
                    posts: PostsResolver,
                    categories: CategoriesResolver
                }
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
                component: PostListComponent,
                resolve: {
                    posts: PostsResolver,
                    categories: CategoriesResolver
                }
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
        path: 'pages',
        data: {
            'authorizedRole': 'Administrator'
        },
        canActivateChild: [AuthGuard],
        children: [
            {
                path: '',
                data: {
                    'resourceType': 'pages',
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
        path: 'not-found',
        component: NotFoundComponent
    },
    {
        path: ':pageSlug',
        data: {
            'authorizedRole': 'Guest'
        },
        canActivate: [AuthGuard],
        component: PageShowComponent,
        resolve: {
            page: PageResolver
        }
    },
    {
        path: '**',
        component: NotFoundComponent
    },
];