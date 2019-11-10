import JWTokenMangerFactory from "../services/token/JWTokenMangerFactory";

export default {
    authTokenSecret: process.env.AUTH_TOCKEN_SECRET || "j19hd1gd@#DD@#-D#@D@D_d012jsada(DH(3da",
    tokenFactoryClass: JWTokenMangerFactory
}