import {JsonApiResourceObject} from './json-api/json-api-resource-object';

export interface Page extends JsonApiResourceObject {
    attributes: {
        createdAt: Date,
        updatedAt: Date,
        title: string,
        slug: string,
        content: string,
        isLive: boolean
    }
}