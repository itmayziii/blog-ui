import { HttpHeaders, HttpParams } from "@angular/common/http";


// TODO (1/4/2018) a RequestOptionsArgs interface used to be provided by Angular, no such interface exists anymore, this can probably be replaced if they add it back.
export interface RequestOptions {
    headers?: HttpHeaders;
    observe?: 'response';
    params?: HttpParams;
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
}