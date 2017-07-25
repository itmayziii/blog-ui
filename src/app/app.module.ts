import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AppComponent } from "./app.component";
import { ContactCreateFormComponent } from "./contact/create-form/contact-create-form.component";
import { NotFoundComponent } from './not-found/not-found.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HttpService } from './services/http/http.service';
import { RequestOptions } from './requests/RequestOptions.class';
import { InputComponent } from './fields/input/input.component';
import { AuthGuard } from './auth-guard/auth-guard.class';
import { RouterModule } from "@angular/router";
import { SimpleNotificationsModule } from 'angular2-notifications';
import { routes } from './router/routes';
import { LoginComponent } from './login/login.component';

@NgModule({
    declarations: [
        AppComponent,
        ContactCreateFormComponent,
        NotFoundComponent,
        FooterComponent,
        HeaderComponent,
        InputComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        ReactiveFormsModule,
        HttpModule,
        BrowserAnimationsModule,
        SimpleNotificationsModule.forRoot()
    ],
    providers: [
        AuthGuard,
        HttpService,
        {provide: RequestOptions, useClass: RequestOptions}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
