import { BaseRequestOptions } from "@angular/http";
import { environment } from '../../environments/environment';

export class RequestOptions extends BaseRequestOptions {
    url: string = environment.apiUri;
}
