import winston from "winston";

/***
 * This is a basci logger for this project. Errors are written into logs/error.log
 * All the logs are written into combined.log
 */
const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: { service: "user-service" },
    transports: [
      new winston.transports.File({ filename: "logs/error.log", level: "error" }),
      new winston.transports.File({ filename: "logs/combined.log" })
    ]
  });

export default logger;
