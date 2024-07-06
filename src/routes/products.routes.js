const {Router} = require('express')
const ProductController = require('../controllers/ProductController')

const productsRoutes = new Router()

productsRoutes.post('/cadastrar', ProductController.criar)
productsRoutes.get('/listar', ProductController.listarTodos)
productsRoutes.get('/:id', ProductController.listarProduto)

module.exports = productsRoutes