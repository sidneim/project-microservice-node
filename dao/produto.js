var pool = require('../database')

module.exports = {

    getProduto: function (Limit, OffSet, callback) {
        pool.query('SELECT * FROM smdatavix.produto  LIMIT ? OFFSET ?', [parseInt(Limit), parseInt(OffSet)], function (err, result) {
            if (err)
                callback(err, err);
            else
                if (result.length > 0)
                    callback(null, result);
                else
                    callback(null, 'Sem');
        })
    },

    postProduto: function (body, callback) {
        //console.log(body[0].dsc)
        callback(null, 'Sem')
    }
}
