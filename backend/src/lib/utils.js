import jwt from 'jsonwebtoken';
import { ENV } from './env';

export const generateToken = (userId, res) => {
    const JWT_SECRET = ENV.JWT_SECRET;
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const token = jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: '7d',
    });
    res.cookie('jwt', token, {
         maxAge: 30 * 24 * 60 * 60 * 1000, // milliseconds
        httpOnly: true, // prevent client-side JS from reading the cookie, prevent xss attacks(cross-site scripting)
        sameSite: 'strict', // CSRF attack prevention
        secure: ENV.NODE_ENV === 'development' ? false : true, // set to true in production
    });

    return token;
}