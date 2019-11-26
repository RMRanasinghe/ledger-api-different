import express, { NextFunction } from "express";
import validate from "express-validation";
import Parser from "./app/parser";
import logger from "./Utils/logger";
import * as validations from "./Utils/validations";

const port = process.env.PORT || 3000;
const app = express();

const errorHandler = (err: Error, req: express.Request, res: express.Response, next: NextFunction) => {
    logger.error(res);
    res.status(400).json(err);
};

app.use(express.json());
app.use(errorHandler);

// define a route handler for the default home page
app.post( "/", validate(validations), ( req, res ) => {
    logger.info("recieved request" + JSON.stringify(req.body));
    let parser = new Parser(req.body); //create new parser
    parser.getLedger(function(ledger: Object, E: Error) {
        //Bad request error
        if (E) {
            res.status(400).json(E).end();
        } else {
            logger.info("sending response" + JSON.stringify(ledger));
            res.status(200).json(ledger).end();
        }
    });
} );

// start the Express server
const server = app.listen( port, () => {
    console.info("App listening at http://%s", port);
});

export default server;
