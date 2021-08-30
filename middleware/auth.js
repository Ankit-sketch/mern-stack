import CustomError from '../utils/customError.js';

import JwtService from '../utils/JwtService.js';

import { User } from '../models/index.js'
export const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return next(CustomError.unauthorise('Unauthorised User'));
    }
    try {
        const { _id } = JwtService.verify(token);
        const user = await User.findOne({ _id });
        if (!user) {
            return next(CustomError.unauthorise('Unauthorised User'));
        }
        req.user = user;
        next();
    }
    catch (error) {
        return next(CustomError.unauthorise('Unauthorised User'));
    }
}