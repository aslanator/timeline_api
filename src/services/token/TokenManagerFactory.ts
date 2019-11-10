import TokenManager from "./TokenManager";

export default abstract class TokenManagerFactory {
    abstract createTokenManager(): TokenManager
}