var http = require('http')
const express = require('express')
const app = express()
var cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fs = require('fs')
var jwt = require('jsonwebtoken')
//const secret = "meu-segredo";//esse segredo do JWT seria uma config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


//função que verifica se o JWT é ok
function verifyJWT(req, res, next) {
    /*
    var token = req.headers['x-access-token'];
    if (!token) {
        //console.log("Token: " + token);
        return res.status(401).send({ auth: false, message: 'Access denied' });
    }
    var publicKey = fs.readFileSync('./public.key', 'utf8');
    jwt.verify(token, publicKey, { algorithm: ["RS256"] }, function (err, decoded) {
        if (err)
            return res.status(401).send({ auth: false, message: 'Access denied' });
        req.userId = decoded.id;
        next();
    });
    */
   //req.userId = 1
   next();
}

exports.app = app
exports.http = http
exports.verifyJWT = verifyJWT