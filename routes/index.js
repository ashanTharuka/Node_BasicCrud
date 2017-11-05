var express = require('express');
var router = express.Router();

var connection = require('../config/Connection');

/* GET home page. */
router.get('/', function (req, res, next) {
    connection.query("select * from user", function (err, rows) {
        if (err)throw err;

        console.log(rows);

        res.render('index', {title: 'Node.js & Express.js', users: rows});
    });

});

router.post('/adduser', function (req, res) {
    const userData = {
        firstName: req.body.fname,
        lastName: req.body.lname,
        email: req.body.email,
        professions: req.body.prof
    }

    connection.query('insert into user set ?', userData, function (err, result) {
        if (err)throw err;
        res.redirect('/');
    });


});


router.get('/deleteUser/:id', function (req, res) {
    var userId = req.params.id;
    console.log('userId : ' + userId);

    connection.query('delete from user where id=?', [userId], function (err, rows) {
        if (err)throw err;
        res.redirect('/');

    });

});


router.get('/edit/:id', function (req, res) {
    var userId = req.params.id;
    connection.query('select * from user where id=?', [userId], function (err, rows) {
        if (err)throw err;
        res.render('edit', {userData: rows});
    });

});

router.post('/updateUser/:id', function (req, res) {

    var fname = req.body.fname;
    var lname = req.body.lname;
    var email = req.body.email;
    var prof = req.body.prof;

    var userId = req.params.id;

    connection.query('update user set firstName=?,lastName=?,email=?,professions=? where id=?', [fname, lname, email, prof, userId], function (err, respond) {
        if (err)throw err;
        res.redirect('../../');
    });


});

module.exports = router;

