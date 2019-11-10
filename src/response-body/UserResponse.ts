import {User} from "../models/User";

export default class UserResponse {

    public id: number;

    public login: string;

    public name: string;

    constructor(user: User) {
        this.id = user.id;
        this.login = user.login;
        this.name = user.name;
    }

}