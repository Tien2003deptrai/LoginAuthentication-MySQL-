const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, process.env.JWT, (err, decoded) => {
            if (err) return res.json({ Status: false, Error: 'Wrong token' });
            req.user = decoded;
            next();
        });
    } else {
        res.json({ Status: false, Error: 'You are not authorized!' });
    }
};

module.exports = verifyToken