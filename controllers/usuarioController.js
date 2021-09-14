var usuario = require('../dao/usuario');

async function validarUsuario() {
    /*
    usuario.sayMyPassword(req.body.user.toUpperCase(), function (err, data) {
        if (req.body.pwd === data) {
            console.log("Certo...");
            return 1;
        }  else {
            console.log("Errado...");
            return 0;
        }            
    });
    */
    return 1;
};

async function addUser(res, req) {
    if (await validarUsuario() === 0) {
        res.status(401).send("Acess denied");
    } else {
        const retorno = await usuario.addUser(req.body);
        if (retorno.err === null) {
            res.status(201).send();
        } else {
            res.status(500).send({ error: { code: '500', message: retorno.err }});
        }
    }
};

async function getAllUser(res, req) {
    if (await validarUsuario() === 0) {
        return res.status(401).send("Acess denied");
    } else {
        var limit = 100;
        var offSet = 0;
        if (req.query !== undefined) {
            if (req.query.limit !== undefined) {
                limit = req.query.limit;
            } 
            if (req.query.offset !== undefined) {
                offSet = req.query.offset;
            } 
        }

        var retorno = await usuario.getAllUser(limit, offSet);
        if (retorno.err === null) {
            return res.status(200).json(retorno.result);
        } else {
            return res.status(500).send({ error: { code: '500', message: retorno.err }});            
        }; // else {
        // console.log("Erro: " + err);
        // return res.status(500).send({ error: { code: '500', message: err }, payload: null });
        // }
    }
};


exports.addUser = addUser;
exports.getAllUsers = getAllUser;