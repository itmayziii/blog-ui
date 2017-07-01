import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ContactCreateFormComponent } from "./contact/create-form/contact-create-form.component";
import { NotFoundComponent } from './not-found/not-found.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { JsonApiService } from './services/json-api/json-api.service';
import { RequestOptions } from './requests/RequestOptions.class';
import { InputComponent } from './fields/input/input.component';


// vendor
import { SimpleNotificationsModule } from 'angular2-notifications';

@NgModule({
    declarations: [
        AppComponent,
        ContactCreateFormComponent,
        NotFoundComponent,
        FooterComponent,
        HeaderComponent,
        InputComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        SimpleNotificationsModule.forRoot()
    ],
    providers: [JsonApiService, {provide: RequestOptions, useClass: RequestOptions}],
    bootstrap: [AppComponent]
})
export class AppModule {

}
