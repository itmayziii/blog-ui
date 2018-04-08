import { Component, OnInit } from '@angular/core';
import { JsonApiResources } from '../../models/json-api/json-api-resoures';
import { JsonApiResourceObject } from '../../models/json-api/json-api-resource-object';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { metadata } from '../metadata';

@Component({
    selector: 'blog-general-resource',
    templateUrl: 'general-resource-list.component.html',
    styleUrls: ['./general-resource-list.component.scss']
})
export class GeneralResourceListComponent implements OnInit {
    private _resources: JsonApiResourceObject[];
    private _resourceType: string;
    private _toDelete: number;
    private _metadata: any = metadata;

    public constructor(private httpClient: HttpClient, private route: ActivatedRoute, private notificationsService: NotificationsService) {
    }

    public ngOnInit(): void {
        this.route.data.subscribe((routeData) => {
            if (!routeData.resourceType) {
                throw new Error('GeneralResourceComponent: There is no resourceType set for the route');
            }

            this._resourceType = routeData.resourceType;
            this.getResources();
        });
    }

    public deleteResource() {
        console.log('this._toDelete ', this._toDelete);
        this.httpClient.delete(`${this.resourceType}/${this._toDelete}`).subscribe(
            (resources) => {
            },
            (response: HttpErrorResponse) => {
                console.log('response ', response);
                this.notificationsService.error('Error', response.error.errors.detail);
            }
        );
    }

    public determineResourceId(resource: JsonApiResourceObject): any {
        return (metadata[this._resourceType].id == 'id') ? resource.id : resource.attributes[metadata[this.resourceType].id];
    }

    private getResources(): void {
        this.httpClient.get(this.resourceType).subscribe((resources: JsonApiResources<any>) => {
            this._resources = resources.data;
        });
    }

    public get resourceType(): string {
        return this._resourceType;
    }

    public get resources(): JsonApiResourceObject[] {
        return this._resources;
    }

    public set toDelete(value: number) {
        this._toDelete = value;
    }

    public get metadata(): any {
        return this._metadata;
    }
}
