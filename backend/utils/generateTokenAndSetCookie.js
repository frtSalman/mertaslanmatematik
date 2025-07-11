import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: '7d',
    });

    res.cookie('token', token, {
        httpOnly: true, // cookie cannot be accessed by client js
        secure: process.env.NODE_ENV === 'production', // only works on https
        sameSite: 'strict', // prevents csrf attacks
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return token;
};
