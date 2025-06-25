import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token)
        return res
            .status(401)
            .json({ success: false, message: 'Tekrar giriş yapın.' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decoded)
            return res
                .status(401)
                .json({ success: false, message: 'Tekrar giriş yapın.' });
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ success: false, message: 'Server error' });
    }
};
