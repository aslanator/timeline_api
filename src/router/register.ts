import {Request, Response} from 'express';
import {Controller, Middleware, Get, Put, Post, Delete} from '@overnightjs/core';
import {Logger} from '@overnightjs/logger';
import {getManager} from "typeorm";
import {User} from "../models/User";
import {NextFunction} from "express-serve-static-core";
import validationMiddleware from "../middleware/validation";
import {RegisterPost} from "../validation/RegisterPost";

@Controller('register')
export class Register {

    @Post('')
    @Middleware([validationMiddleware(new RegisterPost())])
    private async index(req: Request, res: Response) {
        const postRepository = getManager().getRepository(User);

        let login = req.body.login;
        let name = req.body.name;

        res.status(200).json({
            message: login,
        });
    }
}