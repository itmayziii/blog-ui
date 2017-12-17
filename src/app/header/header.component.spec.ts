import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeaderComponent } from "./header.component";
import { UserService } from "../services/user.service";
import { RouterTestingModule } from "@angular/router/testing";

describe('header.component.ts', () => {
    let fixture: ComponentFixture<HeaderComponent>, component: HeaderComponent;

    beforeEach((done) => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [
                HeaderComponent
            ],
            providers: [
                UserService
            ]
        })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(HeaderComponent);
                component = fixture.componentInstance;
                done();
            });
    });

    describe('toggleNavigationView()', () => {

        it('should toggle the isNavigationCollapsed property', () => {
            const originalIsNavigationCollapsed = component.isNavigationCollapsed;

            component.toggleNavigationMenu();
            const actualResult = component.isNavigationCollapsed;
            const expectedResult = !originalIsNavigationCollapsed;

            expect(actualResult).toBe(expectedResult);
        });

    });

});