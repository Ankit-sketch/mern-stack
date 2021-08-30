import { User } from '../../models/index.js';

import crypto from 'crypto';

import sendEmail from '../../utils/emailService.js'

const { createHash, randomBytes } = crypto;

import CustomError from '../../utils/customError.js';

const forgotPasswordController = {
    async forgotPassword(req, res, next) {
        const { email } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return next(CustomError.wrongCredentials('Email Could Not be Sent'));
            }
            const resetToken = randomBytes(20).toString('hex');
            const resetPasswordToken = createHash("sha256").update(resetToken).digest("hex");
            const resetPasswordExpire = Date.now() + 40 * (60 * 1000);
            const newUser = await User.findOneAndUpdate({ email }, {
                resetPasswordToken,
                resetPasswordExpire
            })
            const resetUrl = `http://localhost:3000/resetpassword/${resetToken}`;
            console.log(resetUrl)
            const message = `
            <h1>you have requested a password reset</h1>
            <p>please go to this link to reset password</p>
            <a href = ${resetUrl} clicktracking = off>${resetToken}</a>
            `
            try {
                sendEmail({
                    to: user.email,
                    subject: "Password Reset Request",
                    text: message,
                })
                 res.status(200).json({ success: true, data: "Email Sent" });
            } catch (error) {
                return next(error);
            }
        } catch (error) {
            return next(error);
        }
    }
}

export default forgotPasswordController;