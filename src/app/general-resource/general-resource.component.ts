import { Component, OnInit } from '@angular/core';
import { JsonApiResources } from "../models/json-api/json-api-resoures";
import { JsonApiResourceObject } from "../models/json-api/json-api-resource-object";
import { ActivatedRoute } from "@angular/router";
import { NotificationsService } from "angular2-notifications";
import { JsonApiError } from "../models/json-api/json-api-error";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: 'blog-general-resource',
    template: `
        <div class="container-fluid">
            <div class="row justify-content-center">

                <div class="col-11">
                    <table class="table general-resources">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr *ngFor="let resource of resources">
                            <th class="align-middle" scope="row">{{resource?.id}}</th>
                            <td class="align-middle"><a class="w-100 h-100" routerLink="/categories/{{resource?.id}}">{{resource?.attributes?.name}}</a></td>
                            <td class="align-middle h-100"><i class="general-resources-action fa fa-trash-o text-danger" (click)="deleteResource(resource.id)"></i></td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <!--<ul class="col-11 col-md-8 category-list">-->
                <!--<li class="category-list-item" *ngFor="let resource of resources">-->
                <!--<a class="category-list-item-link" routerLink="/categories/{{resource?.id}}" href="#">{{resource?.attributes?.name}}</a>-->
                <!--<button (click)="deleteResource(resource?.id)" class="category-list-item-button btn btn-danger" type="button">Delete</button>-->
                <!--</li>-->
                <!--</ul>-->

            </div>
        </div>
    `,
    styleUrls: ['./general-resource.scss']
})
export class GeneralResourceComponent implements OnInit {
    private _resources: JsonApiResourceObject[];
    private _resourceType: string;

    public constructor(private httpClient: HttpClient, private route: ActivatedRoute, private notificationsService: NotificationsService) { }

    public ngOnInit(): void {
        this.route.data.subscribe((routeData) => {
            if (!routeData.resourceType) {
                throw new Error('GeneralResourceComponent: There is no resourceType set for the route');
            }

            this._resourceType = routeData.resourceType;
            this.getResources();
        });
    }

    public deleteResource(id: any) {
        this.httpClient.delete(`${this.resourceType}/${id}`).subscribe(
            (resources) => {
                console.log('resources ', resources);
            },
            (error: JsonApiError) => {
                this.notificationsService.error('Error', error.errors.detail);
            }
        );
    }

    private getResources(): void {
        this.httpClient.get(this.resourceType).subscribe((resources: JsonApiResources) => {
            this._resources = resources.data;
        });
    }

    public get resourceType(): string {
        return this._resourceType;
    }

    public get resources(): JsonApiResourceObject[] {
        return this._resources;
    }
}
