import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CreateFormComponent } from "./contact/create-form/create-form.component";
import { MdInputModule } from "@angular/material";


@NgModule({
    declarations: [
        AppComponent,
        CreateFormComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MdInputModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
