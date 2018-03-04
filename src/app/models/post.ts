import { JsonApiResourceObject } from "./json-api/json-api-resource-object";

export interface Post extends JsonApiResourceObject {
    attributes: {
        createdAt: Date,
        updatedAt: Date,
        status: string,
        title: string,
        slug: string,
        content: string,
        imagePath: string
    }
}