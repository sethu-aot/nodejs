const jwt = require('jsonwebtoken');

const secretKey = 'mykey';

// Middleware to verify JWT token
const taskVerify = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ 'message': 'You must be logged in' });
    }
    try {
        const decoded = jwt.verify(authorization, secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ 'message': 'Invalid token' });
    }
};





module.exports = { taskVerify };
