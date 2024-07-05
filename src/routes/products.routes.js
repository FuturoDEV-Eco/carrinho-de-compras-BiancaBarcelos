const {Router} = require('express')
const ProductController = require('../controllers/ProductController')

const productsRoutes = new Router()

productsRoutes.post("/cadastrar", ProductController.criar)
productsRoutes.get("/listar", ProductController.listarTodos)

module.exports = productsRoutes