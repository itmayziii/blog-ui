import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactCreateFormComponent } from './contact/create-form/contact-create-form.component';
import { NotFoundComponent } from "./not-found/not-found.component";
import { AuthGuardComponent } from "./auth-guard/auth-guard.component";

const routes: Routes = [
    {
        canActivate: [AuthGuardComponent],
        path: 'contacts/create',
        component: ContactCreateFormComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(
        routes,
        {enableTracing: true} // Debugging purposes only
    )],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule {
}
