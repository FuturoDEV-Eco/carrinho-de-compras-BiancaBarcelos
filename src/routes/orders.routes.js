const {Router} = require('express')
const OrderController = require('../controllers/OrderController')

const ordersRoutes = new Router()

ordersRoutes.post('/', OrderController.cart)

module.exports = ordersRoutes