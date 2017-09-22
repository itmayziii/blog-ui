import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
    selector: 'blog-blog-create',
    templateUrl: './blog-create.component.html',
    styleUrls: ['./blog-create.component.scss']
})
export class BlogCreateComponent implements OnInit {
    public blogCreateForm: FormGroup;

    public constructor(private formBuilder: FormBuilder) { }

    public ngOnInit(): void {
        this.createForm();
    }

    private createForm(): void {
        this.blogCreateForm = this.formBuilder.group({
            "title": null,
            "slug": null,
            "content": null,
            "category": null,
            "image": null
        });
    }

    public onSubmit(): void {
        console.log('submitting');
    }
}
