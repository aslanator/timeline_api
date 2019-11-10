import {
    Length,
    IsEmail,
    IsString, IsDefined
} from "class-validator";
import {Request} from "express";


export class RegisterPostRequest {

    @Length(4, 255)
    @IsEmail()
    protected login: string;

    @Length(1, 255)
    @IsString()
    protected name: string;

    @Length(6, 255)
    @IsString()
    protected password: string;

    public constructor(request: Request) {
        let body = request.body;
        this.login = body.login;
        this.name = body.name;
        this.password = body.password;
    }

    public getLogin() {
        return this.login;
    }

    public getName() {
        return this.name;
    }

    public getPassword() {
        return this.password;
    }
}