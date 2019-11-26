import Joi from "joi";
/**
 * Input JSON validation. 
 */
module.exports = {
  body: {
    start: Joi.string().required().isoDate(), //start iso string
    end: Joi.string().required().isoDate(), // end iso string
    frequency: Joi.string().required().valid(['WEEKLY','FORTNIGHTLY','MONTHLY']), //frequezy 
    amount: Joi.number().required(), //weekly amount as integer
    timezone: Joi.string().required() //timezone tz
  }
};
