import { HttpService } from "./http.service";
import { Observable } from "rxjs/Observable";
import { RequestOptions } from "../../requests/RequestOptions.class";

describe('http.service.ts', () => {
    let httpSpy, routerSpy, httpService: HttpService, observable: Observable<any>;

    beforeEach(() => {
        observable = Observable.create();
        routerSpy = jasmine.createSpyObj('routerSpy', ['navigate']);

        httpSpy = jasmine.createSpyObj('httpSpy', {
            get: observable
        });
        httpService = new HttpService(httpSpy, routerSpy);
    });

    describe('get()', () => {

        it('should make an http get request with the correct url', () => {
            spyOn(observable, 'map').and.callThrough();
            spyOn(observable, 'catch');

            httpService.get('users');
            expect(httpSpy.get).toHaveBeenCalledTimes(1);
            expect(httpSpy.get).toHaveBeenCalledWith('http://localhost:4200/v1/users', jasmine.any(Object));
            expect(observable.catch).not.toHaveBeenCalled();
            expect(observable.map).toHaveBeenCalledTimes(1);
        });

    });
});