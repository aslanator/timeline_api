import {
    Length,
    IsEmail,
    IsString, IsDefined, IsOptional
} from "class-validator";
import {Request} from "express";


export class AuthPostRequest {

    @Length(4, 255)
    @IsEmail()
    protected login: string;

    @Length(6, 255)
    @IsString()
    protected password: string;

    @IsString()
    @IsOptional()
    protected captcha: string;

    public constructor(request: Request) {
        let body = request.body;
        this.login = body.login;
        this.captcha = body.captcha;
        this.password = body.password;
    }

    public getLogin() {
        return this.login;
    }

    public getCaptcha() {
        return this.captcha;
    }

    public getPassword() {
        return this.password;
    }
}