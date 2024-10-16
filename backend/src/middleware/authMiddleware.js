const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.token;
    if (!authHeader) {
        return res.status(401).json({
            message: 'No token provided',
            status: 'ERR'
        });
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, function(err, user) {
        if (err) {
            return res.status(403).json({
                message: 'Invalid token',
                status: 'ERR'
            });
        }

        if (user?.isAdmin) {
            next();
        } else {
            return res.status(403).json({
                message: 'Unauthorized access',
                status: 'ERR'
            });
        }
    });
};

const authUserMiddleware = (req, res, next) => {
    const authHeader = req.headers.token;
    if (!authHeader) {
        return res.status(401).json({
            message: 'No token provided',
            status: 'ERR'
        });
    }

    const token = authHeader.split(' ')[1];
    const userId = req.params.id;

    jwt.verify(token, process.env.ACCESS_TOKEN, function(err, user) {
        if (err) {
            return res.status(403).json({
                message: 'Invalid token',
                status: 'ERR'
            });
        }

        if (user?.isAdmin || user?.id == userId) {
            next();
        } else {
            return res.status(403).json({
                message: 'Unauthorized access',
                status: 'ERR'
            });
        }
    });
};

module.exports = {
    authMiddleware,
    authUserMiddleware
};
