import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ContactCreateFormComponent } from "./contact-create-form.component";

describe('CreateFormComponent', () => {
    let component: ContactCreateFormComponent;
    let fixture: ComponentFixture<ContactCreateFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ContactCreateFormComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ContactCreateFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
