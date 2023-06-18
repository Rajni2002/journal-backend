const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    db: process.env.DB_DBNAME
};

export default dbConfig;