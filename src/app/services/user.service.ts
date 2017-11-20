import { Injectable } from "@angular/core";
import { User } from "../models/user";

@Injectable()
export class UserService {
    private _user: User;
    private _userId: number;

    public get user(): User {
        return this._user;
    }

    public set user(value: User) {
        this._user = value;
    }

    public get userId(): number {
        return this._userId;
    }

    public set userId(value: number) {
        this._userId = value;
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

    public isLoggedIn(): boolean {
        if (this.user) {
            return true;
        }

        return false;
    }
}