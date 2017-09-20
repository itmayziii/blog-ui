import { Injectable } from "@angular/core";
import { User } from "../models/user";

@Injectable()
export class UserService {
    private _user: User;

    public get user(): User {
        return this._user;
    }

    public set user(value: User) {
        this._user = value;
    }

    public isAdmin(): boolean {
        return this.userRole() === 'Administrator';
    }

    public userRole(): string {
        if (!this.user) {
            return 'Guest';
        }

        return this.user.role;
    }
}