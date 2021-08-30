import { User } from '../../models/index.js';

import CustomError from '../../utils/customError.js'

import Joi from 'joi';

const registerController = {
    async register(req, res, next) {
        const details = req.body;

        // validation 
        const registerSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            repeat_password: Joi.ref('password')
        });
        const { error } = registerSchema.validate(req.body);
        if (error) {
            return next(error);
        }
        try {
            const exist = await User.exists({ email: req.body.email });
            if (exist) {
                return next(CustomError.alreadyExist('This email is already taken.'));
            }
            const user = await User.create({
                ...details
            })
            res.status(200).json({
                success: true,
                user,
                message: "User Created Successfully"
            })
        } catch (error) {
            return next(error);
        }
        
    }
}

export default registerController;