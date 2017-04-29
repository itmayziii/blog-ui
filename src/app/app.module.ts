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
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
    declarations: [
        AppComponent,
        ContactCreateFormComponent,
        NotFoundComponent,
        FooterComponent,
        HeaderComponent,
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
