import { JsonApiMeta } from "./json-api-meta";
import { JsonApiLinks } from "./json-api-links";
import { JsonApiResourceObject } from "./json-api-resource-object";

export interface JsonApiResource {
    jsonapi: JsonApiMeta,
    data: JsonApiResourceObject,
    links: JsonApiLinks
}