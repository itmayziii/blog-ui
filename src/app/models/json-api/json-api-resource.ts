import { JsonApiLinks } from "./json-api-links";

export interface JsonApiResource<resourceType> {
    data: resourceType,
    links: JsonApiLinks
}