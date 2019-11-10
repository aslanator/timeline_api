import {User} from "../../models/User";
import {AuthPostRequest} from "../../request-body/AuthPostRequest";
import {Repository} from "typeorm";
import AuthServiceUserHandler from "./AuthServiceUserHandler";
import {compareSync} from 'bcrypt-nodejs';

export default class Authenticator extends AuthServiceUserHandler {

    protected authPostRequest: AuthPostRequest;

    constructor(userRepository: Repository<User>, authPostRequest: AuthPostRequest) {
        super(userRepository);
        this.authPostRequest = authPostRequest;

    }

    public async getUser(): Promise<User | boolean> {
        const user = await this.getUserByLogin(this.authPostRequest.getLogin());
        if (user instanceof User) {
            let passwordHash = user.password;
            let authPassword = this.authPostRequest.getPassword();
            if (compareSync(authPassword, passwordHash)) {
                return user;
            }
            this.errorMessage = 'Password doesn\'t match';
        } else {
            this.errorMessage = 'User with that login doesn\'t exists';
        }
        return false;
    }

    protected async getUserByLogin(login: string): Promise<User | boolean> {
        const user = await this.userRepository.findOne({where: {login: login}})
        if (user)
            return user;
        return false;
    }

}