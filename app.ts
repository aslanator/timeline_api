import express, {NextFunction} from "express";
import {Request, Response} from "express-serve-static-core";

const port = process.env.PORT ? <number><unknown>process.env.PORT : 3005;

import Server from './src/server';

const server = new Server();
server.start(port);



