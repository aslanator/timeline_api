import {RequestHandler} from "express-serve-static-core";
import {validate, ValidationError} from "class-validator";
import HttpException from "../exceptions/HttpException";
import RequestValidationInterface from "../request-body/RequestValidationInterface";


function validationMiddleware<T>(type: RequestValidationInterface<T>): RequestHandler {
    return (req, res, next) => {
        const object = new type(req);
        validate(object, req.body)
            .then((errors: ValidationError[]) => {
                if (errors.length > 0) {
                    const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
                    next(new HttpException(400, message));
                } else {
                    next();
                }
            });
    };
}

export default validationMiddleware;