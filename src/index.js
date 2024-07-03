//primeiro servidor criar aqui - com a biblioteca express

const express = require('express')
const clientsRoutes = require('./routes/clients.routes')

const app = express()

app.use(express.json())

app.use('/clients', clientsRoutes)

app.listen(3000, () => {
    console.log("Servidor Online")
})