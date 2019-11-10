import {NextFunction, Request, Response} from 'express';
import {Controller, Middleware, Post} from '@overnightjs/core';
import {getManager} from "typeorm";
import {User} from "../models/User";
import validationMiddleware from "../middleware/validation";
import HttpException from "../exceptions/HttpException";
import {AuthPostRequest} from "../request-body/AuthPostRequest";
import Authenticator from "../services/auth/Authenticator";
import UserWithTokenResponse from "../response-body/UserWithTokenResponse";
import getTokenFactory from "../services/token/getTokenFactory";

@Controller('auth')
export class AuthController {

    @Post('')
    @Middleware([validationMiddleware(AuthPostRequest)])
    private async index(req: Request, res: Response, next: NextFunction) {
        const authPostRequest = new AuthPostRequest(req);
        const userRepository = getManager().getRepository(User);
        const auth = new Authenticator(userRepository, authPostRequest);
        const user = await auth.getUser();
        if (user instanceof User) {
            const tokenMangerFactory = getTokenFactory();
            const tokenManager = tokenMangerFactory.createTokenManager();
            const token = tokenManager.createToken({user: user});
            res.status(200).json({
                message: new UserWithTokenResponse(user, token),
            });
        } else {
            next(new HttpException(400, auth.getErrorMessage()));
        }
    }
}