import { JsonApiLinks } from "./json-api-links";

export interface JsonApiResources<resourceType> {
    data: resourceType[],
    included: any,
    links: JsonApiLinks
}