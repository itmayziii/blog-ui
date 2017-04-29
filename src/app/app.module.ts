import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ContactCreateFormComponent } from "./contact/create-form/create-form.component";
import { MdButtonModule, MdInputModule } from "@angular/material";
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
    declarations: [
        AppComponent,
        ContactCreateFormComponent,
        NotFoundComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MdInputModule,
        MdButtonModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
