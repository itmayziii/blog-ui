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
import { JsonApiService } from './services/http/json-api.service';
import { InputComponent } from './fields/input/input.component';
import { AuthGuard } from './auth-guard/auth-guard.class';
import { RouterModule } from "@angular/router";
import { SimpleNotificationsModule } from 'angular2-notifications';
import { routes } from './router/routes';
import { LoginComponent } from './users/login/login.component';
import { RegisterComponent } from './users/register/register.component';
import { CustomFormsModule } from 'ng2-validation';
import { ContactShowComponent } from './contact/show/contact-show.component';
import { HttpService } from "./services/http/http.service";
import { RouteService } from "./services/route.service";

@NgModule({
    declarations: [
        AppComponent,
        ContactCreateFormComponent,
        ContactShowComponent,
        NotFoundComponent,
        FooterComponent,
        HeaderComponent,
        InputComponent,
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        ReactiveFormsModule,
        HttpModule,
        BrowserAnimationsModule,
        SimpleNotificationsModule.forRoot(),
        CustomFormsModule
    ],
    providers: [
        RouteService, // MUST remain as a singleton
        AuthGuard,
        JsonApiService,
        HttpService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
