import { JsonApiResourceObject } from "./json-api/json-api-resource-object";

export interface Post extends JsonApiResourceObject {
    attributes: {
        createdAt: Date,
        updatedAt: Date,
        status: string,
        title: string,
        slug: string,
        content: string,
        preview: string,
        imagePathSm: string,
        imagePathMd: string,
        imagePathLg: string,
        categoryId: string,
        userId: string
    }
}