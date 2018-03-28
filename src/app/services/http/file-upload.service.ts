import { ElementRef, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { UserService } from '../user.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class FileUploadService {

    public constructor(private userService: UserService) {
    }

    public uploadFiles(fileUploadElement: ElementRef): Observable<string> {
        const formData = new FormData();

        const inputEl: HTMLInputElement = fileUploadElement.nativeElement;
        this.addAppendFilesToFormData(inputEl.files, formData);

        return Observable.create((observer: Observer<string>) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', `${environment.apiUri}/${environment.apiVersion}/images`, true);
            xhr.withCredentials = true;
            xhr.send(formData);

            xhr.onreadystatechange = () => {
                if (xhr.readyState !== 4) {
                    return;
                }

                if (xhr.status === 201) {
                    observer.next(JSON.parse(xhr.responseText));
                    observer.complete();
                    return;
                }

                observer.error(xhr.responseText);
                observer.complete();
            }
        });
    }

    private addAppendFilesToFormData(files: FileList, formData: FormData): void {
        for (let i = 0, numberOfFiles = files.length; i < numberOfFiles; i++) {
            formData.append(files[i].name, files[i]);
        }
    }
}