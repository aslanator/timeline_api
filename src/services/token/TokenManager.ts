export default interface TokenManager {
    createToken(payload: string | Buffer | object): string
}