import { BaseRequestOptions, Http, HttpModule, ResponseOptions, Response, Headers } from "@angular/http";
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

        it('should make an http get request to the correct url with the correct options', (done) => {
            inject([HttpService, MockBackend], (httpService: HttpService, mockBackend: MockBackend) => {
                mockBackend.connections.subscribe((connection: MockConnection) => {
                    const responseOptions = new ResponseOptions({
                        body: '{"data":"Awesome Test"}',
                        status: 200
                    });

                    // Using endsWith to prevent fragile tests when configuration changes
                    expect(connection.request.url.endsWith('users')).toBeTruthy();
                    expect(connection.request.headers.toJSON()).toEqual({"Content-Type": ['JSON']});

                    const response: Response = new Response(responseOptions);
                    connection.mockRespond(response);
                });

                httpService.get('users').subscribe((response) => {
                    expect(response.data).toBeDefined();
                    expect(response.data).toBe("Awesome Test");
                    done();
                });
            })();
        });

        it('if an error occurs with the request then the router navigates to the login page', (done) => {
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
                    expect(router.navigate).toHaveBeenCalledWith(['/users/login']);
                    done();
                });
            })();
        });

        it('should allow passed in headers to override default headers', (done) => {
            inject([HttpService, MockBackend], (httpService: HttpService, mockBackend: MockBackend) => {
                mockBackend.connections.subscribe((connection: MockConnection) => {
                    const responseOptions = new ResponseOptions({
                        body: '{"data":"Amazing Test"}',
                        status: 200
                    });

                    expect(connection.request.headers.toJSON()).toEqual({"Content-Type": ["text/plain"]});

                    const response: Response = new Response(responseOptions);
                    connection.mockRespond(response);
                });

                const headers = new Headers({"Content-Type": "text/plain"});
                httpService.get('users', {headers: headers}).subscribe(() => {
                    done();
                });
            })();
        });

    });

    describe('post()', () => {

        it('should make an http post request ')

    });
});

class RouterStub {
    public navigate() {}
}