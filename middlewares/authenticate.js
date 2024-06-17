import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.redirect('/auth/login');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.redirect('/auth/login');
    }
};

export default authenticate;
