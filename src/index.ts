import express, { NextFunction } from "express";
import validate from "express-validation";
import * as validations from "./Utils/validations";
import logger from "./Utils/logger"

const port = process.env.PORT || 3000;
const app = express();

const errorHandler = (err: Error, req: express.Request, res: express.Response, next: NextFunction) => {
    logger.error(res)
    res.status(400).json(err);
};

app.use(express.json());
app.use(errorHandler);

// define a route handler for the default home page
app.post( "/", validate(validations), ( req, res ) => {
    logger.info(req.body);

    res.send("hello world");
} );

// start the Express server
const server = app.listen( port, () => {
    console.info("App listening at http://%s", port);
});

export default server;
