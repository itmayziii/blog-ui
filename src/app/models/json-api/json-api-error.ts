import { JsonApiMeta } from "./json-api-meta";
import { JsonApiErrorBody } from "./json-api-error-body";

export interface JsonApiError {
    errors: JsonApiErrorBody
    jsonapi: JsonApiMeta
}