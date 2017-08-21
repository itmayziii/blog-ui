import { BaseRequestOptions, Http, HttpModule, ResponseOptions, Response } from "@angular/http";
import { MockBackend, MockConnection } from "@angular/http/testing";
import { inject, TestBed } from "@angular/core/testing";
import { HttpService } from "./http.service";
import { Router } from "@angular/router";

describe('http.service.ts', () => {
    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                MockBackend,
                BaseRequestOptions,
                HttpService,
                {
                    provide: Http,
                    deps: [
                        MockBackend,
                        BaseRequestOptions
                    ],
                    useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backend, defaultOptions);
                    }
                },
                {
                    provide: Router,
                    useClass: RouterStub
                }
            ]
        });
    });

    describe('get()', () => {

        it('should make an http get request with the correct url', inject([HttpService, MockBackend], (httpService: HttpService, mockBackend: MockBackend) => {
            mockBackend.connections.subscribe((connection: MockConnection) => {
                const responseOptions = new ResponseOptions({
                    body: '{"data":"Awesome Test"}',
                    status: 200
                });
                const response: Response = new Response(responseOptions);

                connection.mockRespond(response);
            });

            httpService.get('users').subscribe((response) => {
                expect(response.data).toBeDefined();
                expect(response.data).toBe("Awesome Test");
            });
        }));

        it('if an error occurs with the request then the router navigates to the login page',
            inject([HttpService, MockBackend, Router], (httpService: HttpService, mockBackend: MockBackend, router: Router) => {
                mockBackend.connections.subscribe((connection: MockConnection) => {
                    const responseOptions = new ResponseOptions({
                        url: 'http://localhost/blogs',
                        body: '{"error":"Unauthorized"}',
                        status: 401
                    });
                    const response: any = new Response(responseOptions);

                    connection.mockError(response);
                });
                spyOn(router, 'navigate');

                httpService.get('users').subscribe((response) => {
                    expect(router.navigate).toHaveBeenCalledTimes(1);
                });
            }));

    });
});

class RouterStub {
    public navigate() {}
}