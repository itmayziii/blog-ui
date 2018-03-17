import { Injectable } from "@angular/core";
import { User } from "../models/user";

@Injectable()
export class UserService {
    private _user: User;

    public isAdmin(): boolean {
        return this.role() === 'Administrator';
    }

    public role(): string {
        if (!this._user || !this._user.attributes.role) {
            return 'Guest';
        }

        return this._user.attributes.role;
    }

    public isLoggedIn(): boolean {
        return this._user !== undefined && this._user !== null;
    }

    public get user(): User {
        return this._user;
    }

    public set user(value: User) {
        this._user = value;
    }
}