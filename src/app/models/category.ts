import { JsonApiResourceObject } from "./json-api/json-api-resource-object";

export interface Category extends JsonApiResourceObject {
    name: string,
    createdAt: Date,
    updatedAt: Date
}