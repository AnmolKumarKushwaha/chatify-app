import jwt from 'jsonwebtoken';


export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
    res.cookie('jwt', token, {
         maxAge: 30 * 24 * 60 * 60 * 1000, // milliseconds
        httpOnly: true, // prevent client-side JS from reading the cookie, prevent xss attacks(cross-site scripting)
        sameSite: 'strict', // CSRF attack prevention
        secure: process.env.NODE_ENV === 'development' ? false : true, // set to true in production
    });

    return token;
}