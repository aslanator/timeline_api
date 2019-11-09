import * as bodyParser from 'body-parser';
import * as router from '../router';
import {Server} from '@overnightjs/core';
import {Logger} from '@overnightjs/logger';
import {Request, Response, RequestHandler} from "express-serve-static-core";
import {NextFunction} from "express";
import db from '../database';

class ExampleServer extends Server {

    private readonly SERVER_STARTED = 'Server started on port: ';

    constructor() {
        super(true);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.setupControllers();
    }

    private setupControllers(): void {
        const ctlrInstances = [];
        for (const name in router) {
            if (router.hasOwnProperty(name)) {
                const route = (router as any)[name];
                ctlrInstances.push(new route());
            }
        }
        super.addControllers(ctlrInstances);
    }

    public start(port: number): void {

        db.then(connection => {
            this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
                Logger.Err(err.stack);
                res.status(err.status || 400).json({
                    message: err.message || 'An error.',
                    errors: err.error || ['Unexpected error'],
                });
            });

            this.app.use((req: Request, res: Response) => {
                res.status(404).json({
                    message: 'Not found',
                    errors: ['404 not found'],
                });
            });

            this.app.listen(port, () => {
                Logger.Imp(this.SERVER_STARTED + port);
            });
        });
    }
}

export default ExampleServer;