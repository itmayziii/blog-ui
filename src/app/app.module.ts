import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ContactCreateComponent } from './contact/create/contact-create.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { InputComponent } from './fields/input/input.component';
import { AuthGuard } from './auth-guard/auth-guard.class';
import { RouterModule } from '@angular/router';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { routes } from './routes';
import { LoginComponent } from './users/login/login.component';
import { RegisterComponent } from './users/register/register.component';
import { CustomFormsModule } from 'ng2-validation';
import { ContactShowComponent } from './contact/show/contact-show.component';
import { RouteService } from './services/route.service';
import { LogoutComponent } from './users/logout/logout.component';
import { AuthService } from './services/auth.service';
import { PostListComponent } from './post/list/post-list.component';
import { UserService } from './services/user.service';
import { PostShowComponent } from './post/show/post-show.component';
import { PostCreateComponent } from './post/create/post-create.component';
import { SlugifyDirective } from './post/directives/slugify.directive';
import { FileUploadService } from './services/http/file-upload.service';
import { MarkdownService } from './services/markdown.service';
import { HighlightService } from './services/highlight.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JsonapiInterceptor } from './http-interceptors/jsonapi-interceptor';
import { HttpErrorInterceptor } from './http-interceptors/http-error-interceptor';
import { WindowRef } from './globals/window-ref';
import { GoogleAnalyticsService } from './services/google-analytics.service';
import { FileUploadComponent } from './file/upload/file-upload.component';
import { LoaderComponent } from './loader/loader.component';
import { WithCredentialsInterceptor } from './http-interceptors/with-credentials-interceptor';
import { PostsResolver } from './data-resolvers/posts-resolver';
import { PrebootModule } from 'preboot';
import { CategoriesResolver } from './data-resolvers/categories-resolver';
import { MetaService } from './meta.service';
import { PostResolver } from './data-resolvers/post-resolver';
import { LoadingService } from './services/loading.service';
import { PageShowComponent } from './page/show/page-show.component';
import { PageResolver } from './data-resolvers/page-resolver';
import { MarkdownContentComponent } from './markdown-content/markdown-content.component';
import { DropdownDirective } from './directives/dropdown.directive';

@NgModule({
    declarations: [
        AppComponent,
        ContactCreateComponent,
        ContactShowComponent,
        NotFoundComponent,
        FooterComponent,
        HeaderComponent,
        InputComponent,
        LoginComponent,
        RegisterComponent,
        LogoutComponent,
        PostListComponent,
        PostShowComponent,
        PostCreateComponent,
        SlugifyDirective,
        DropdownDirective,
        FileUploadComponent,
        LoaderComponent,
        MarkdownContentComponent,
        PageShowComponent
    ],
    imports: [
        BrowserModule.withServerTransition({appId: 'blog'}),
        PrebootModule.withConfig({appRoot: 'blog-root', buffer: false}),
        RouterModule.forRoot(routes, {initialNavigation: 'enabled'}),
        ReactiveFormsModule,
        BrowserAnimationsModule,
        SimpleNotificationsModule.forRoot(),
        CustomFormsModule,
        HttpClientModule
    ],
    providers: [
        RouteService, // MUST remain as a singleton
        UserService, // MUST remain as a singleton
        FileUploadService,
        MetaService,
        AuthGuard,
        AuthService,
        MarkdownService,
        WindowRef,
        GoogleAnalyticsService,
        PostsResolver,
        CategoriesResolver,
        PageResolver,
        PostResolver,
        HighlightService,
        LoadingService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: WithCredentialsInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JsonapiInterceptor,
            multi: true,
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
