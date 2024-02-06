const db = require('../util/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authRegister = async (req, res) => {
    try {
        const sql = 'INSERT INTO User (username, email, password, role) VALUES (?, ?, ?, ?)';
        const hasdPassword = await bcrypt.hash(req.body.password, 10);
        const values = [req.body.username, req.body.email, hasdPassword, req.body.role];
        await db.query(sql, values);
        return res.json({ Status: true, Message: 'Register successful' });
    } catch (error) {
        return res.json({ Status: false, Error: 'Error query' });
    }
}

const authLogin = async (req, res) => {
    const sql = 'SELECT * FROM User WHERE email = ?';
    const values = [req.body.email];
    await db.query(sql, values, (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Error query' });
        if (result.length > 0) {
            const storeHasdPassword = result[0].password;
            const isMatchPassword = bcrypt.hash(req.body.password, storeHasdPassword);
            if (isMatchPassword) {
                const email = result[0].email;
                const role = result[0].role;
                const token = jwt.sign(
                    { email: email, role: role },
                    process.env.JWT,
                    { expiresIn: '1d' }
                )
                res.cookie('token', token);
                res.json({ Status: true, Auth: { email, token, role: result[0].role } })
            } else {
                res.json({ Status: false, Error: 'Password not is match' });
            }
        } else {
            res.json({ Status: false, Error: 'Error email or password' });
        }
    })
}

const getAuth = async (req, res) => {
    const sql = 'SELECT * FROM User';
    db.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Error query' });
        return res.json({ Status: true, Result: result });
    })
}

module.exports = {
    authRegister,
    authLogin,
    getAuth
}