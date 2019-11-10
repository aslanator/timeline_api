import {User} from "../../../src/models/User";
import {AuthPostRequest} from "../../../src/request-body/AuthPostRequest";
import {Repository} from "typeorm";
import {Request} from 'express';
import Authenticator from "../../../src/services/auth/Authenticator";
import {Substitute, Arg} from '@fluffy-spoon/substitute';

jest.mock('bcrypt-nodejs');
import {compareSync} from "bcrypt-nodejs";


describe('Authenticator', function () {
    let authenticator: Authenticator;
    let authPostRequest: AuthPostRequest;
    let userRepository: Repository<User>;
    const request: Request = Substitute.for<Request>();
    const repository = Substitute.for<Repository<User>>();

    beforeEach(() => {
        userRepository = repository;
        authPostRequest = new AuthPostRequest(request);
        authenticator = new Authenticator(userRepository, authPostRequest);
    });


    it('should get user', async () => {
        let user: User | boolean;
        (compareSync as jest.Mock)
            .mockReturnValueOnce(true)
            .mockReturnValueOnce(false);
        expect(authenticator).toBeInstanceOf(Authenticator);
        Authenticator.prototype['getUserByLogin'] = async function (login: string): Promise<User | boolean> {
            return new User();
        };
        user = await authenticator.getUser();
        expect(user).toBeInstanceOf(User);
        user = await authenticator.getUser();
        expect(user).toBeFalsy();
        expect(compareSync).toBeCalledTimes(2);
    })
});