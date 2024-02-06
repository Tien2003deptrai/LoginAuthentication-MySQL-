const verifyToken = require('./verifyToken');

const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user) {
            next();
        } else {
            res.json({ Status: false, Error: 'You are not authorized!' });
        }
    });
};

module.exports = verifyUser;
