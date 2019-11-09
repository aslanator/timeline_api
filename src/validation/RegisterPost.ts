import {
    IsInt,
    Length,
    IsEmail,
    Min,
    Max,
    IsString, IsDefined
} from "class-validator";

export class RegisterPost {

    @Length(4, 255)
    @IsEmail()
    @IsDefined()
    login: string;

    @Length(1, 255)
    @IsString()
    @IsDefined()
    name: string;

    @Length(6, 255)
    @IsString()
    @IsDefined()
    password: string;
}