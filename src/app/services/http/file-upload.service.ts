import { ElementRef, Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { UserService } from "../user.service";

@Injectable()
export class FileUploadService {

    public constructor(private userService: UserService) {
    }

    public uploadFile(fileUploadElement: ElementRef): Observable<string> {
        const formData = new FormData();

        const inputEl: HTMLInputElement = fileUploadElement.nativeElement;
        this.addAppendFilesToFormData(inputEl.files, formData);

        return Observable.create((observer: Observer<string>) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://localhost:4200/v1/images', true);
            xhr.setRequestHeader('API-Token', this.userService.user.api_token);
            xhr.send(formData);

            xhr.onreadystatechange = () => {
                if (xhr.readyState !== 4) {
                    return;
                }

                if (xhr.status === 200) {
                    observer.next(xhr.responseText);
                    observer.complete();
                    return;
                }

                observer.error(xhr.responseText);
                observer.complete();
            }
        });
    }

    private addAppendFilesToFormData(files: FileList, formData: FormData) {
        for (let i = 0, numberOfFiles = files.length; i < numberOfFiles; i++) {
            formData.append(files[i].name, files[i]);
        }
    }
}