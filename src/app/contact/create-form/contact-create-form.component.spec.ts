import { ContactCreateFormComponent } from "./contact-create-form.component";
import { SimpleNotificationsModule } from "angular2-notifications/dist";
import { JsonApiService } from "../../services/http/json-api.service";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ComponentFixture, inject, TestBed } from "@angular/core/testing";
import { Observable } from "rxjs/Observable";
import { HttpModule } from "@angular/http";
import { RouterTestingModule } from "@angular/router/testing";
describe('contact-create-form.component.ts', () => {
    let fixture: ComponentFixture<ContactCreateFormComponent>, comp: ContactCreateFormComponent;

    beforeEach((done) => {
        TestBed.configureTestingModule({
            imports: [FormsModule, SimpleNotificationsModule.forRoot(), ReactiveFormsModule, HttpModule, RouterTestingModule],
            declarations: [
                ContactCreateFormComponent
            ],
            providers: [
                JsonApiService
            ]
        })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(ContactCreateFormComponent);
                comp = fixture.componentInstance;
                done();
            });
    });

    describe('onSubmit()', () => {
        let formGroup: FormGroup;

        beforeEach(() => {
            spyOn(formGroup, 'disable');
            spyOn(formGroup, 'enable');
            spyOn(formGroup, 'reset');
        });
    });

    it('should make an HTTP POST request to the contacts api', () => {
        inject([JsonApiService], (jsonApi: JsonApiService) => {
            spyOn(jsonApi, 'post').and.returnValue(Observable.of(['Testing ContactCreateForm']));
            comp.onSubmit();

            expect(jsonApi.post).toHaveBeenCalledTimes(1);
        })();
    });

    it('should notify the user of successful completion and reset/enable the form', () => {

    });

});