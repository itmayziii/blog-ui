import {ElementRef, Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";

@Injectable()
export class FileUploadService {
    public uploadFile(fileUploadElement: ElementRef): Observable<string> {
        const formData = new FormData();

        const inputEl: HTMLInputElement = fileUploadElement.nativeElement;
        this.addAppendFilesToFormData(inputEl.files, formData);

        return Observable.create((observer: Observer<string>) => {


            // const xhr = new XMLHttpRequest();
            // xhr.open('POST', 'http://localhost:4200/v1/images', true);
            // xhr.send(formData);
        });
    }

    private addAppendFilesToFormData(files: FileList, formData: FormData) {
        for (let file in files) {
            console.log(file);
        }
    }
}