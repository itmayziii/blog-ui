import { JsonApiLinks } from "./json-api-links";

export interface JsonApiResources<resourceType> {
    data: resourceType[],
    links: JsonApiLinks
}