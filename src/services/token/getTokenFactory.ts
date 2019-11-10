import token from "../../config/token";
import {Logger} from "@overnightjs/logger";
import JWTokenMangerFactory from "./JWTokenMangerFactory";
import TokenManagerFactory from "./TokenManagerFactory";

export default function (): TokenManagerFactory {
    const factoryClass = token.tokenFactoryClass;
    const factory: any = new factoryClass();
    if (factory instanceof TokenManagerFactory)
        return factory;
    Logger.Err('Error in token configuration file. tokenClass does not match the TokenManagerFactory interface');
    return new JWTokenMangerFactory();
};