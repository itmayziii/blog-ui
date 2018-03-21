import { Injectable } from '@angular/core';
import { Meta, MetaDefinition } from "@angular/platform-browser";

@Injectable()
export class MetaService {
    private currentMetaEls: HTMLMetaElement[];

    public constructor(private meta: Meta) {

    }

    public setMeta(metaDefinitions: MetaDefinition[]) {
        if (this.currentMetaEls) {
            this.currentMetaEls.forEach((currentMetaEl: HTMLMetaElement) => {
                this.meta.removeTagElement(currentMetaEl);
            });
        }

        this.currentMetaEls = this.meta.addTags(metaDefinitions);
    }
}
