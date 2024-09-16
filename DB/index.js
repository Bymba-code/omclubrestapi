const mysql = require("mysql2");
const db = mysql.createPool({
    host: "103.50.206.175",
    user: "admin",
    database: "clubApp",
    password: "Jijgee030712@",
    connectionLimit: 20, 
    queueLimit: 0 
});

// Using pool to execute query
const executeQuery = async (query, params) => {
    return new Promise((resolve, reject) => {
        db.query(query, params, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

// Checking connection to the database
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

module.exports = {
    executeQuery,
    checkConnection
};
