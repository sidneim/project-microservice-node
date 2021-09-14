var pool = require('../database');
var logger = require('../log4j');

async function addUser(body) {
    let values = [];
    try {        
        for (let i = 0; i < body.length; i++)
            values.push([body[i].nom.trim(), body[i].login.trim(), body[i].senha.trim()]);        
        logger.debug('usuario.adduser: var body: ' + values);
        console.log(values)
    } catch (error) {
        logger.error('usuario.adduser: Erro Validando JSON  ' + error);
        return {result: null, err: 'Erro validando colunas JSON: ' + error};        
    }

    try {
        var retorno = await pool.query('insert into smdatavix.usuario (nom, login, senha) values ($1, $2, $3) RETURNING *', values[0]);
        return {result: retorno, err: null};        
    } catch (error) {
        logger.error('usuario.adduser: erro  ' + error);
        console.log(error);
        return {result: null, err: error};
    }
}

async function getAllUser(Limit, OffSet) {
    try {
        var result = await pool.query('SELECT id, nom FROM smdatavix.usuario where flg_ativo = $1 order by 2 LIMIT $2 OFFSET $3',  ["S",parseInt(Limit),parseInt(OffSet)]);  
        return {result: result.rows, err: null};
    } catch (error) {
        logger.error('usuario.getAllUser: erro  ' + error);
        return {result: null, err: error};        
    }    
}

function sayMyPassword(userLogin, callback) {
    pool.query('SELECT senha FROM smdatavix.usuario where UPPER(login) = ? and flg_ativo = "S"', [userLogin], function (err, result) {
        if (err)
            callback(err, null);
        else
            if (result.length > 0)
                callback(null, result[0].senha);
            else
                callback(null, null);
    })
}

exports.getAllUser = getAllUser;
exports.sayMyPassword = sayMyPassword;
exports.addUser = addUser;