import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
<<<<<<< HEAD
import { ContactCreateFormComponent } from './contact/create-form/contact-create-form.component';
=======
import { ContactCreateFormComponent } from './contact/create-form/create-form.component';
>>>>>>> master
import { NotFoundComponent } from "./not-found/not-found.component";

const routes: Routes = [
    {
        path: 'contacts/create',
        component: ContactCreateFormComponent
    },
    {
        path: '**',
        component: ContactCreateFormComponent //TODO use not found component
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule {
}
