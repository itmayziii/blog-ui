import { Injectable } from '@angular/core';
import { Meta, MetaDefinition } from "@angular/platform-browser";

@Injectable()
export class MetaService {
    private currentMetaEls: HTMLMetaElement[];

    public constructor(private meta: Meta) {

    }

    public setMeta(metaDefinitions: MetaDefinition[]) {
        this.removeMeta();
        this.currentMetaEls = this.meta.addTags(metaDefinitions);
    }

    public removeMeta(): void {
        if (!this.currentMetaEls) return;

        this.currentMetaEls.forEach((currentMetaEl: HTMLMetaElement) => {
            this.meta.removeTagElement(currentMetaEl);
        });

        this.currentMetaEls = null;
    }
}
