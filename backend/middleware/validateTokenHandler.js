const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');


const validateTokenHandler = asyncHandler(async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        res.status(401);
        throw new Error('No token, authorization denied');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.manager = decoded;
        console.log('Token is valid:', decoded);
        console.log('Manager ID:', req.manager.id);
        next();
    } catch (error) {
        res.status(401);
        throw new Error('Invalid token');
    }
});

module.exports = validateTokenHandler;
