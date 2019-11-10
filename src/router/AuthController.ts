import {NextFunction, Request, Response} from 'express';
import {Controller, Middleware, Get, Put, Post, Delete} from '@overnightjs/core';
import {getManager, QueryFailedError} from "typeorm";
import {User} from "../models/User";
import validationMiddleware from "../middleware/validation";
import {RegisterPostRequest} from "../request-body/RegisterPostRequest";
import UserResponse from "../response-body/UserResponse";
import HttpException from "../exceptions/HttpException";
import Registrar from "../services/auth/Registrar";
import {AuthPostRequest} from "../request-body/AuthPostRequest";
import Authenticator from "../services/auth/Authenticator";

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
            res.status(200).json({
                message: new UserResponse(user),
            });
        } else {
            next(new HttpException(400, auth.getErrorMessage()));
        }
    }
}