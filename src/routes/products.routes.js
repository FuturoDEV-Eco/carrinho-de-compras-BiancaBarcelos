const {Router} = require('express')
const ProductController = require('../controllers/ProductController')

const productsRoutes = new Router()

productsRoutes.post("/cadastrar", ProductController.criar)

module.exports = productsRoutes