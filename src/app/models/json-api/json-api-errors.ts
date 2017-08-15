import { JsonApiMeta } from "./json-api-meta";
import { JsonApiError } from "./json-api-error";

export interface JsonApiErrors {
    errors: JsonApiError
    jsonapi: JsonApiMeta
}