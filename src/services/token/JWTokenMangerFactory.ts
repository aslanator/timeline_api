import TokenManager from "./TokenManager";
import JWTokenManger from "./JWTokenManger";
import TokenManagerFactory from "./TokenManagerFactory";

export default class JWTokenMangerFactory extends TokenManagerFactory {
    createTokenManager(): TokenManager {
        return new JWTokenManger();
    }
}