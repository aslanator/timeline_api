import TokenManager from "./TokenManager";
import token from "../../config/token";
import {sign} from "jsonwebtoken";

export default class JWTokenManger implements TokenManager {
    createToken(payload: string | Buffer | object): string {
        const secret = token.authTokenSecret;
        return sign(payload, secret, {
            expiresIn: '12h',
        });
    }
}
