import mongoose from 'mongoose'

const {Schema, model } = mongoose;

import bcrypt from 'bcrypt'

const Userschema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select : false },
    resetPasswordToken : String,
    resetPasswordExpire : String
},{ timestamps: false });

Userschema.pre('save', async function(next) {
        if(!this.isModified('password')){
            next();
        }
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
})


const User = model('User', Userschema);

export default User;