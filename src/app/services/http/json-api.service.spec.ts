import { TestBed, inject } from '@angular/core/testing';

import { JsonApiService } from './json-api.service';

describe('HttpService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [JsonApiService]
        });
    });

    it('should ...', inject([JsonApiService], (service: JsonApiService) => {
        expect(service).toBeTruthy();
    }));
});
