var restapi = require('./restapi')
var product = require('./dao/produto')

restapi.app.get('/product', restapi.verifyJWT, (req, res, next) => {
    product.getProduto(req.body.Limit, req.body.OffSet, function (err, result) {
        res.status(200).json(result)
    })
})

restapi.app.post('/product', restapi.verifyJWT, (req, res, next) => {
    product.postProduto(req.body, function (err, result) {
        res.status(200).json(result)
    })
})


var server = restapi.http.createServer(restapi.app);
server.listen(3001);
console.log("Servidor Rest Product escutando na porta 3001...")