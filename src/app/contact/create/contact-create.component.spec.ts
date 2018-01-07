import { ContactCreateComponent } from "./contact-create.component";
import { NotificationsService, SimpleNotificationsModule } from "angular2-notifications";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ComponentFixture, inject, TestBed } from "@angular/core/testing";
import { Observable } from "rxjs/Observable";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientModule } from "@angular/common/http";

describe('contact-create-form.component.ts', () => {
    let fixture: ComponentFixture<ContactCreateComponent>, component: ContactCreateComponent;

    beforeEach((done) => {
        TestBed.configureTestingModule({
            imports: [FormsModule, SimpleNotificationsModule.forRoot(), ReactiveFormsModule, HttpClientModule, RouterTestingModule],
            declarations: [
                ContactCreateComponent
            ],
            providers: [
                JsonApiService
            ]
        })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(ContactCreateComponent);
                component = fixture.componentInstance;
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

                component.contactCreateForm.setValue(fakeFormValues);

                spyOn(jsonApi, 'post').and.returnValue(Observable.of(['Testing ContactCreateForm']));
                component.onSubmit().then(() => {
                    expect(jsonApi.post).toHaveBeenCalledTimes(1);
                    expect(jsonApi.post).toHaveBeenCalledWith('contacts', fakeFormValues);
                    done();
                });
            })();
        });

        it('should notify the user of successful completion and reset/enable the form', (done) => {
            inject([JsonApiService, NotificationsService], (jsonApi: JsonApiService, notifications: NotificationsService) => {
                spyOn(jsonApi, 'post').and.returnValue(Observable.of(['Testing ContactCreateForm']));
                spyOn(component.contactCreateForm, 'enable');
                spyOn(component.contactCreateForm, 'disable');
                spyOn(component.contactCreateForm, 'reset');
                spyOn(notifications, 'success');

                component.onSubmit().then(() => {
                    expect(component.contactCreateForm.disable).toHaveBeenCalledTimes(1);
                    expect(component.contactCreateForm.reset).toHaveBeenCalledTimes(1);
                    expect(component.contactCreateForm.enable).toHaveBeenCalledTimes(1);
                    expect(notifications.success).toHaveBeenCalledTimes(1);
                    expect(notifications.success).toHaveBeenCalledWith('Success', 'Thank you for your submission!');
                    done();
                });
            })();
        });

        it('should notify the user of errors and enable the form', (done) => {
            inject([JsonApiService, NotificationsService], (jsonApi: JsonApiService, notifications: NotificationsService) => {
                spyOn(jsonApi, 'post').and.returnValue(Observable.throw(['Testing ContactCreateForm']));
                spyOn(component.contactCreateForm, 'enable');
                spyOn(component.contactCreateForm, 'disable');
                spyOn(component.contactCreateForm, 'reset');
                spyOn(notifications, 'error');

                component.onSubmit().catch(() => {
                    expect(component.contactCreateForm.disable).toHaveBeenCalledTimes(1);
                    expect(component.contactCreateForm.reset).not.toHaveBeenCalled();
                    expect(component.contactCreateForm.enable).toHaveBeenCalledTimes(1);
                    expect(notifications.error).toHaveBeenCalledTimes(1);
                    expect(notifications.error).toHaveBeenCalledWith('Error', 'There was a problem! Please try again later');
                    done();
                });
            })();
        });
    });
});