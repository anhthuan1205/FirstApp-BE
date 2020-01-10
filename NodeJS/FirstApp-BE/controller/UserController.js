const jwt = require('jsonwebtoken');
var con = require('../config/Database');
var user = require('../model/User');
var bcrypt = require('bcrypt');

const secret = 'secret';
const saltOfRounds = 10;

exports.getAllUsers = function(req, res) {
        con.query('SELECT * FROM FirstDatabase.users', function(err, result) {
            if (err) {
                console.log(err);
                res.status(404).json({
                    'msg': err
                });
            } else {
                console.log("ok");
                res.status(200).send(result);
                console.log(result);
            };
        });
};

exports.getUser = function(req, res) {
    var token = req.body.token || req.headers['x-access-token'] || req.query.token;
    decode = jwt.decode(token, {complete:true});
    console.log(decode.payload.id);
    let idUser = decode.payload.id;
    let sql = "SELECT * FROM FirstDatabase.users WHERE id='"+idUser+"'";
    con.query(sql, function(err, result) {
        if(err) {
            throw err;
        } else {
            res.status(200).send(result[0]);
            console.log(result[0]);
        }
    });
}

exports.register = function(req, res) {
    var data = new user(req.body);
    let sql =  "SELECT * FROM FirstDatabase.users WHERE email='"+data.email+"'";
    console.log(sql);
    con.query(sql, function(err, result) {
        if(err) {
            throw err;
        } else {
            if(result.length == 0) {
                const hash = bcrypt.hashSync(req.body.password, saltOfRounds);
                data.password = hash;
                let sql = "INSERT INTO FirstDatabase.users VALUES (DEFAULT, '" + data.name + "', '" + data.email + "', '" + data.password + "')";
                console.log(sql);
                con.query(sql, function(err, result) {
                    if (err) throw err;
                    return res.status(200).send({
                        'msg': "Created User!!!"
                    });
                });
            } else {
                res.status(500).send({
                    'msg': "Email has been used!!!"
                });
            };
        };
    });
};

exports.login = function(req, res) {
    let sql = "SELECT * FROM FirstDatabase.users WHERE email ='" + req.body.email + "'";
    con.query(sql, function(err, result) {
        if (err) {
            throw err;
        } else {
            if (result.length === 0) {
                res.status(404).json({
                    'msg': "Email not exist!"
                });
            } else {
                var dataUser = new user(result[0]);
                console.log(dataUser);
                bcrypt.compare(req.body.password, dataUser.password, (err , next) => {
                    console.log(next)
                    if(next === true) {  
                        console.log("password is correct");
                        var token = jwt.sign({ id: dataUser.id }, secret, {
                            expiresIn: 300 // expires in 5 mins
                          });
                        res.status(200).send({token: token, 'msg': 'Login success!!!'});
                    } else {
                        console.log("password not correct");
                        res.status(404).json({
                            'msg': "password not correct"
                        });;
                    }
                });
            }
        }
    })
}