var restapi = require('./restapi')
var usuario = require('./dao/usuario');
var usuarioController = require('./controllers/usuarioController');
const fs = require('fs')
var jwt = require('jsonwebtoken')

var somar = function(n1,n2,callback){
    var total = n1 + n2;
    callback(total);
};

//rota de login
restapi.app.post('/login/:limit&:offset', (req, res, next) => {
    console.log("Entrou em /login...")
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
}),

restapi.app.post('/user/add', (req, res, next) => {
    usuarioController.addUser(res, req);
}),

restapi.app.get('/user', (req, res, next) => {
    console.log("Entrou em /user/get...");
    
    usuarioController.getAllUsers(res, req);
})

var server = restapi.http.createServer(restapi.app);
server.listen(3000);
console.log("Servidor Login escutando na porta 3000...")