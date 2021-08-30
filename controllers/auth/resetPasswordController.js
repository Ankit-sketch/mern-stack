import crypto from 'crypto';

const { createHash } = crypto;

import { User } from '../../models/index.js';

import CustomError from '../../utils/customError.js';

const resetPasswordController = {
    async resetPassword(req, res, next){
            const resetPasswordToken = createHash("sha256").update(req.params.resetToken).digest("hex");
            try {
                const user = await User.findOne({
                    resetPasswordToken,
                    resetPasswordExpire : { $gt: Date.now() }
                })
                if(!user){
                    return next(CustomError.invalidToken("invalid token"));
                }
                const updateduser = await User.findOneAndUpdate({
                    password : req.body.password,
                    resetPasswordToken : null,
                    resetPasswordExpire : null
                })
                res.send(updateduser)
            } catch (error) {
                return next(error);
            }
    } 
}

export default resetPasswordController;