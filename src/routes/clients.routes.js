const {Router} = require('express')
const ClientController = require('../controllers/ClientController')


const clientsRoutes = new Router()

clientsRoutes.post("/cadastrarcliente", ClientController.criar)

//declarar aqui as rotas
module.exports = clientsRoutes