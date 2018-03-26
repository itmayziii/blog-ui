import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class LoadingService {
    private _loading$: Subject<boolean> = new Subject<boolean>();
    private _isLoading$: Observable<boolean> = this._loading$.asObservable();
    private _currentLoadingState: boolean = false;

    public constructor() {
    }

    public get isLoading$(): Observable<boolean> {
        return this._isLoading$;
    }

    public toggleLoading(isLoading: boolean): void {
        this._loading$.next(isLoading);
    }
}
