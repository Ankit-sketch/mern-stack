import { User } from '../../models/index.js';

import CustomError from '../../utils/customError.js';

import JwtService from '../../utils/JwtService.js'

import bcrypt from 'bcrypt';

const loginController = {
    async login(req, res, next) {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({
                success: false,
                error: "Please provide email and password"
            })
        }

        try {
            const user = await User.findOne({ email }).select('password');
            if (!user) {
                return next(CustomError.wrongCredentials('Wrong Credentuials'));
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return next(CustomError.wrongCredentials('Wrong Credentuials'));
            }
            const token = JwtService.sign({ _id: user._id });
            res.status(200).json({
                success: true,
                token
            })
        } catch (error) {
            next(error);
        }
    }
}

export default loginController;