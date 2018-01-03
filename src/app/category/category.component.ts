import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { JsonApiService } from "../services/http/json-api.service";
import { JsonApiResources } from "../models/json-api/json-api-resoures";
import { JsonApiResourceObject } from "../models/json-api/json-api-resource-object";

@Component({
    selector: 'blog-category',
    template: `
        <div class="container-fluid">
            <div class="row justify-content-center">

                <ul class="col-8 category-list">
                    <li class="category-list-item row justify-content-around align-content-center" *ngFor="let category of categories">

                        <div class="col-12">
                            <a class="category-list-item-link" routerLink="/categories/{{category?.attributes?.name}}" href="#">{{category?.attributes?.name}}</a>
                            <button class="btn btn-danger" type="button">Delete</button>
                        </div>

                    </li>
                </ul>

            </div>
        </div>
    `,
    styleUrls: ['./category.scss']
})
export class CategoryComponent implements OnInit {
    public categoryCreateForm: FormGroup;
    public categories: JsonApiResourceObject[];

    constructor(private formBuilder: FormBuilder, private jsonApiService: JsonApiService) { }

    ngOnInit() {
        // this.categoryCreateForm = this.formBuilder.group({
        //     "name": ""
        // });

        this.jsonApiService.get('categories').subscribe((resource: JsonApiResources) => {
            this.categories = resource.data;
            console.log('this.categories ', this.categories);
        });
    }

}
