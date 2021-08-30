import passport from 'passport';

import googlestrategy from 'passport-google-oauth20';

const { Strategy } = googlestrategy

import { CLIENT_ID, CLIENT_SECRET, CALLBACK_URL } from '../../config/index.js'

passport.use(new Strategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL
}, (accessToken, refreshToken, profile) => {
    console.log(profile);
}))
