import {User} from "../models/User";
import UserResponse from "./UserResponse";

export default class UserWithTokenResponse {

    public user: UserResponse;

    public access_token: string;

    constructor(user: User, token: string) {
        this.user = new UserResponse(user);
        this.access_token = token;
    }

}