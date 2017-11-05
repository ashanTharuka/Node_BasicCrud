/**
 * Created by Ashan Tharuka on 10/29/2017.
 */
var mysql = require('mysql');
var db;
var settings = {
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'crudapp'
}

function connectDatabase() {
    if (!db) {
        db = mysql.createConnection(settings);
        db.connect(function (err) {
            if (!err) {
                console.log("database Connected")
            } else {
                console.log("err database Connected")
            }
        })
    }

    return db;
}
module.exports = connectDatabase();