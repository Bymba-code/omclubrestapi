const mysql = require("mysql")

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "club",
    password: "",
    connectionLimit:5
    
})

const executeQuery = (sql, params) => {
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

const checkConnection = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT 1', (err, results) => {
            if (err) {
                console.error('Database connection failed:', err);
                return reject(err);
            }
            console.log('Database connection successful');
            resolve(results);
        });
    });
};

module.exports = 
{
    executeQuery,
    checkConnection
}