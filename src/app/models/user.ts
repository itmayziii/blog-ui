import { JsonApiResourceObject } from "./json-api/json-api-resource-object";

export interface User extends JsonApiResourceObject {
    createdAt: Date,
    updatedAt: Date,
    firstName: string,
    lastName: string,
    email: string,
    apiToken: string,
    role: string
}