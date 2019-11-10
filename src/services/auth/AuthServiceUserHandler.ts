import {User} from "../../models/User";
import {RegisterPostRequest} from "../../request-body/RegisterPostRequest";
import {Repository} from "typeorm";

export default class AuthServiceUserHandler {

    protected userRepository: Repository<User>;

    protected errorMessage: string;

    constructor(userRepository: Repository<User>) {
        this.userRepository = userRepository;
    }

    public getErrorMessage(): string {
        return this.errorMessage;
    }
}