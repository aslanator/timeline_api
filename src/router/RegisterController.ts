import {NextFunction, Request, Response} from 'express';
import {Controller, Middleware, Get, Put, Post, Delete} from '@overnightjs/core';
import {getManager, QueryFailedError} from "typeorm";
import {User} from "../models/User";
import validationMiddleware from "../middleware/validation";
import {RegisterPostRequest} from "../request-body/RegisterPostRequest";
import UserResponse from "../response-body/UserResponse";
import HttpException from "../exceptions/HttpException";
import Registrar from "../services/auth/Registrar";

@Controller('register')
export class RegisterController {

    @Post('')
    @Middleware([validationMiddleware(RegisterPostRequest)])
    private async index(req: Request, res: Response, next: NextFunction) {
        const registerPostRequest = new RegisterPostRequest(req);
        const userRepository = getManager().getRepository(User);
        const user = new User();
        const register = new Registrar(user, userRepository, registerPostRequest);
        await register.register();
        const registeredUser = register.getRegisteredUser();
        if (registeredUser) {
            res.status(200).json({
                message: new UserResponse(user),
            });
        } else {
            next(new HttpException(400, register.getErrorMessage()));
        }
    }
}