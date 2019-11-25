import Joi from "joi";

module.exports = {
  body: {
    start: Joi.string().required().isoDate(),
    end: Joi.string().required().isoDate(),
    frequency: Joi.string().required().valid(['WEEKLY','FORTNIGHTLY','MONTHLY']),
    amount: Joi.number().required(),
    timezone: Joi.string().required()
  }
};
