import connection from '../models/db.js'

const teacherAuth = (req, res, next) => {
    const { user_id } = req.body;
    connection.query(`SELECT * FROM users WHERE id = ${user_id}`, (err, results) => {
        if (err) {
            console.error("Teacher auth failed", err);
            return res.status(500).json({ error: 'Internal server error' });
        } else {
            if (results[0].user_role == 2) {
                return next();
            } else {
                return res.status(500).json({ error: 'You are not a teacher' });
            }
        }
    })
}

export default teacherAuth;