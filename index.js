//index.js
var usuario = require('./dao/usuario')
var product = require('./dao/produto')
var http = require('http');
const express = require('express')
const app = express()
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
const fs = require('fs');
//const secret = "meu-segredo";//esse segredo do JWT seria uma config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//rota protegida
app.get('/clientes', verifyJWT, (req, res, next) => {
    usuario.getAllUser(function (err, result) {
        //console.log(result);
        res.status(200).json(result)
    })
    //console.log("Retornou todos clientes!");
    //res.status(200).json([{ id: 1, nome: 'luiz' }]);
})

app.get('/product', verifyJWT, (req, res, next) => {
    product.getProduto(req.body.Limit, req.body.OffSet, function (err, result) {
        res.status(200).json(result)
    })
})


//rota de login
app.post('/login', (req, res, next) => {
    usuario.sayMyPassword(req.body.user.toUpperCase(), function (err, data) {
        let senha;
        if (err) {
            senha = '';
        } else {
            senha = data;
        }
        if (req.body.pwd === senha) {
            //auth ok 
            const id = 1; //esse id viria do banco de dados 
            var privateKey = fs.readFileSync('./private.key', 'utf8');
            var token = jwt.sign({ id }, privateKey, {
                expiresIn: 600, // 5min 
                algorithm: "RS256" //SHA-256 hash signature
            });
            console.log("Fez login e gerou token!");
            return res.status(200).send({ auth: true, token: token });
        }
        return res.status(401).send('Login inválido!');
    });
})

//rota de logout
app.post('/logout', function (req, res) {
    console.log("Fez logout e cancelou o token!");
    res.status(200).send({ auth: false, token: null });
});

//função que verifica se o JWT é ok
function verifyJWT(req, res, next) {
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
        //console.log("User Id: " + decoded.id)
        next();
    });
}

var server = http.createServer(app);
server.listen(3000);
console.log("Servidor escutando na porta 3000...")