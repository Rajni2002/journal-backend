import mysql from 'mysql';
import dbConfig from '../config/db.config.js';

const connnection = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.db,
  multipleStatements: true
});

connnection.connect(function(err) {
  if (err) throw err;
  console.log(`Successfully Connected! to ${dbConfig.db}`);
});

export default connnection;