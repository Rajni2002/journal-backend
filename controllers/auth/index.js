import connection from '../../models/db.js'
// import AppError from '../../utils/appError';

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Generate JWT token
function generateToken(user) {
    const payload = {
        id: user.id,
        username: user.username
    };
    return jwt.sign(payload, "VBVECDGDEGCHCDAHCNBEA*&^*@&*#$HVFFBNVF", { expiresIn: '1h' });
}

export const signUpUser = (req, res, next) => {
    const { username, password, user_role } = req.body;

    connection.query('SELECT * FROM users WHERE username = ?', username, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        } else if (results.length) {
            return res.status(200).json({ error: 'Username already exists' });
        } else {
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Internal server error' });
                } else {
                    const user = { username, password: hashedPassword, user_role };

                    connection.query('INSERT INTO users SET ?', user, (err, result) => {
                        if (err) {
                            console.error(err);
                            return res.status(500).json({ error: 'Internal server error' });
                        } else {
                            const token = generateToken({ id: result.insertId, username });
                            return res.json({ token });
                        }
                    });
                }
            });
        }
    });

}

export const signInUser = (req, res, next) => {
    const { username, password } = req.body;

    connection.query('SELECT * FROM users WHERE username = ?', username, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        } else if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password' });
        } else {
            const hashedPassword = results[0].password;

            bcrypt.compare(password, hashedPassword, (err, match) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Internal server error' });
                } else if (!match) {
                    return res.status(401).json({ error: 'Invalid username or password' });
                } else {
                    const token = generateToken(results[0]);
                    return res.json({ token });
                }
            });
        }
    });
}

export const getUser = (req, res, next) => {
    if (
        !req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer') ||
        !req.headers.authorization.split(' ')[1]
    ) {
        return res.status(422).json({
            message: "Please provide the token",
        });
    }
    const theToken = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(theToken, 'the-super-strong-secrect');
    connection.query('SELECT * FROM users where id=?', decoded.id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'Fetch Successfully.' });
    });
}