import jwt from 'jsonwebtoken';

const {sign,verify} = jwt;

import { JWT_SECRET, JWT_EXPIRE } from '../config/index.js';

class JwtService {
    static sign(payload, secret = JWT_SECRET, expiry = JWT_EXPIRE){
        return sign(payload, secret, {expiresIn : expiry});
    }

    static verify(token, secret = JWT_SECRET){
        return verify(token, secret);
    }
}

export default JwtService;