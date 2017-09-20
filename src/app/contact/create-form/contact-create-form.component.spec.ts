import { ContactCreateFormComponent } from "./contact-create-form.component";
import { NotificationsService, SimpleNotificationsModule } from "angular2-notifications/dist";
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

        it('should make an HTTP POST request to the contacts api', (done) => {
            inject([JsonApiService], (jsonApi: JsonApiService) => {
                const fakeFormValues = {
                    'first-name': 'John',
                    'last-name': 'Doe',
                    'email': 'johndoe@testing.com',
                    'comments': 'I would like to arrange a phone session'
                };

                comp.contactCreateForm.setValue(fakeFormValues);

                spyOn(jsonApi, 'post').and.returnValue(Observable.of(['Testing ContactCreateForm']));
                comp.onSubmit().then(() => {
                    expect(jsonApi.post).toHaveBeenCalledTimes(1);
                    expect(jsonApi.post).toHaveBeenCalledWith('contacts', fakeFormValues);
                    done();
                });
            })();
        });

        it('should notify the user of successful completion and reset/enable the form', (done) => {
            inject([JsonApiService, NotificationsService], (jsonApi: JsonApiService, notifications: NotificationsService) => {
                spyOn(jsonApi, 'post').and.returnValue(Observable.of(['Testing ContactCreateForm']));
                spyOn(comp.contactCreateForm, 'enable');
                spyOn(comp.contactCreateForm, 'disable');
                spyOn(comp.contactCreateForm, 'reset');
                spyOn(notifications, 'success');

                comp.onSubmit().then(() => {
                    expect(comp.contactCreateForm.disable).toHaveBeenCalledTimes(1);
                    expect(comp.contactCreateForm.reset).toHaveBeenCalledTimes(1);
                    expect(comp.contactCreateForm.enable).toHaveBeenCalledTimes(1);
                    expect(notifications.success).toHaveBeenCalledTimes(1);
                    expect(notifications.success).toHaveBeenCalledWith('Success', 'Thank you for your submission!');
                    done();
                });
            })();
        });

        it('should notify the user of errors and enable the form', (done) => {
            inject([JsonApiService, NotificationsService], (jsonApi: JsonApiService, notifications: NotificationsService) => {
                spyOn(jsonApi, 'post').and.returnValue(Observable.throw(['Testing ContactCreateForm']));
                spyOn(comp.contactCreateForm, 'enable');
                spyOn(comp.contactCreateForm, 'disable');
                spyOn(comp.contactCreateForm, 'reset');
                spyOn(notifications, 'error');

                comp.onSubmit().catch(() => {
                    expect(comp.contactCreateForm.disable).toHaveBeenCalledTimes(1);
                    expect(comp.contactCreateForm.reset).not.toHaveBeenCalled();
                    expect(comp.contactCreateForm.enable).toHaveBeenCalledTimes(1);
                    expect(notifications.error).toHaveBeenCalledTimes(1);
                    expect(notifications.error).toHaveBeenCalledWith('Error', 'There was a problem! Please try again later');
                    done();
                });
            })();
        });
    });
});