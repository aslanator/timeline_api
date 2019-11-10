import {RegisterPostRequest} from "../../request-body/RegisterPostRequest";
import {User} from "../../models/User";
import {Repository} from "typeorm";
import {Logger} from "@overnightjs/logger";
import {hashSync} from 'bcrypt-nodejs';
import AuthServiceUserHandler from "./AuthServiceUserHandler";

export default class Registrar extends AuthServiceUserHandler {

    protected registerPostRequest: RegisterPostRequest;

    protected user: User;

    protected registeredUser: User;

    constructor(user: User, userRepository: Repository<User>, registerPostRequest: RegisterPostRequest) {
        super(userRepository);
        this.user = user;
        this.registerPostRequest = registerPostRequest;
    }

    public async register() {
        this.user.login = this.registerPostRequest.getLogin();
        this.user.password = this.getPassword();
        this.user.name = this.registerPostRequest.getName();
        try {
            this.registeredUser = await this.userRepository.save(this.user);
        } catch (e) {
            Logger.Warn(e.stack);
            this.errorMessage = e.message;
        }
    }

    public getRegisteredUser(): User | boolean {
        if (this.registeredUser)
            return this.registeredUser;
        return false;
    }

    protected getPassword(): string {
        return hashSync(this.registerPostRequest.getPassword());
    }
}