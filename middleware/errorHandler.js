import { DEV_MODE } from '../config/index.js'

import Joi from 'joi';

const { ValidationError } = Joi;

import customError from '../utils/customError.js';

const errorHandler = (err, req, res, next) => {

          let statuscode = 500;
          let data = {
              message : "Internal Server Error",
            ...(DEV_MODE === 'true' && {original_error : err.message}),
          }

          if(err instanceof ValidationError){
            statuscode = 400;
            data = {
                message: err.message,
            }
          }
          if(err instanceof customError){
            statuscode = err.status;
            data = {
                message: err.message,
            }
          }
          return res.status(statuscode).json(data);
}

export default errorHandler;