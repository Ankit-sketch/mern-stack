import { Router } from "express";

const route = Router();

import passport  from 'passport';


import { registerController, loginController, forgotPasswordController, resetPasswordController} from '../controllers/index.js';


route.post('/register', registerController.register);

route.post('/login', loginController.login);

route.put('/forgotPassword', forgotPasswordController.forgotPassword);

route.put('/resetPassword/:resetToken', resetPasswordController.resetPassword);

import '../controllers/auth/googleOauth.js'

route.get('/google', passport.authenticate("google", {
    scope : ["profile", "email"]
}));

route.get('/google/callback', passport.authenticate("google"));


export default route;