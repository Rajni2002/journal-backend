import connection from '../../models/db.js'

export const createJournal = (req, res, next) => {
    const { description, url, published_date, tagged_users, user_id } = req.body;
    let entry = {
        description, published_date, user_id
    };
    entry = url ? { ...entry, url } : entry;
    connection.query('INSERT INTO journals SET ?', entry, (err, resultJournal) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        } else {
            if (tagged_users) {
                const values = [];
                tagged_users.forEach(item => {
                    values.push([resultJournal.insertId, item]);
                });
                let resultString = "";
                values.forEach((value, idx) => {
                    if (idx === values.length - 1) {
                        resultString += `(${value[0]}, ${value[1]})`
                    } else {
                        resultString += `(${value[0]}, ${value[1]}),`
                    }
                })

                connection.query(`INSERT INTO journal_tagged_students (journal_id, user_id) values ${resultString}`, (err, resultTagged) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ error: 'Internal server error' });
                    } else {
                        return res.status(200).json({
                            resultTagged,
                            resultJournal
                        })
                    }
                })
            } else {
                return res.status(200).json({
                    resultJournal
                })
            }
        }
    })
}