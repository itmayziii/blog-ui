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

        it('should make an HTTP GET request to the correct url with the correct options', (done) => {
            inject([HttpService], (httpService: HttpService) => {
                makeSuccessfulHttpRequest((connection: MockConnection) => {
                    expect(connection.request.url.endsWith('users')).toBeTruthy();
                    expect(connection.request.headers.toJSON()).toEqual({"Content-Type": ['text/plain']});
                });

                const headers = new Headers({"Content-Type": "text/plain"});
                httpService.get('users', {headers: headers}).subscribe((response) => {
                    expect(response.data).toBeDefined();
                    expect(response.data).toBe("Awesome Test");
                    done();
                });
            })();
        });

        it('should navigate to the login page if an authentication error occurs', (done) => {
            inject([HttpService, Router], (httpService: HttpService, router: Router) => {
                makeBadHttpRequest();
                spyOn(router, 'navigate');

                httpService.get('users').subscribe(() => {
                    expect(router.navigate).toHaveBeenCalledTimes(1);
                    expect(router.navigate).toHaveBeenCalledWith(['/users/login']);
                    done();
                });
            })();
        });

    });

    describe('post()', () => {

        it('should make an HTTP POST request to the correct url with the correct options', (done) => {
            inject([HttpService], (httpService: HttpService) => {
                makeSuccessfulHttpRequest((connection: MockConnection) => {
                    expect(connection.request.url.endsWith('users')).toBeTruthy();
                    expect(connection.request.getBody()).toEqual('TestingBody');
                    expect(connection.request.headers.toJSON()).toEqual({"Content-Type": ['text/plain']});
                });

                const headers = new Headers({"Content-Type": "text/plain"});
                httpService.post('users', 'TestingBody', {headers: headers}).subscribe((response) => {
                    expect(response.data).toBeDefined();
                    expect(response.data).toBe("Awesome Test");
                    done();
                });
            })();
        });

        it('should navigate to the login page if an authentication error occurs', (done) => {
            inject([HttpService, Router], (httpService: HttpService, router: Router) => {
                makeBadHttpRequest();
                spyOn(router, 'navigate');

                httpService.post('users', {}).subscribe(() => {
                    expect(router.navigate).toHaveBeenCalledTimes(1);
                    expect(router.navigate).toHaveBeenCalledWith(['/users/login']);
                    done();
                });
            })();
        });

    });
});

class RouterStub {
    public navigate() {}
}

function makeSuccessfulHttpRequest(callback?: Function) {
    inject([MockBackend], (mockBackend: MockBackend) => {
        mockBackend.connections.subscribe((connection: MockConnection) => {
            const responseOptions = new ResponseOptions({
                url: connection.request.url,
                body: '{"data":"Awesome Test"}',
                status: 200
            });

            if (callback) {
                callback(connection);
            }

            const response: Response = new Response(responseOptions);
            connection.mockRespond(response);
        });
    })();
}

function makeBadHttpRequest(callback?: Function) {
    inject([MockBackend], (mockBackend: MockBackend) => {
        mockBackend.connections.subscribe((connection: MockConnection) => {
            const responseOptions = new ResponseOptions({
                url: connection.request.url,
                body: '{"error":"Unauthorized"}',
                status: 401
            });

            if (callback) {
                callback(connection);
            }

            const response: Response | any = new Response(responseOptions);
            connection.mockError(response);
        });
    })();
}