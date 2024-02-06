const verifyToken = require('./verifyToken');

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role) {
            next();
        } else {
            res.json({ Status: false, Error: 'You are not authorized!' });
        }
    });
};

module.exports = verifyAdmin;
