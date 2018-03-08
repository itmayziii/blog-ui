import { JsonApiResourceObject } from "./json-api/json-api-resource-object";

export interface Category extends JsonApiResourceObject {
    name: string,
    slug: string,
    posts: number,
    createdAt: Date,
    updatedAt: Date
}