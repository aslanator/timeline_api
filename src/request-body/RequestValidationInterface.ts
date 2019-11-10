import {Request} from "express";

export default interface RequestValidationInterface<T> {
    new(request: Request): T;
}