const { Pool } = require('pg');

const conexao = new Pool({
    user: 'postgres',     
    host: 'localhost',        
    database: 'carrinho_de_compras',  
    password: 'Kleston!123',     
    port: 5432,  
})

class ClientController{
    //Cadastro Cliente
    async criar(request, response) {
        try {
            const dados = request.query

            if (!dados.name || !dados.email || !dados.cpf || !dados.contact) {
                return response.status(400).json({
                    mensagem: 'Todos os dados são obrigatórios!'
                })
            }

            const servico = await conexao.query(`
                INSERT into clients
                    (name, email, cpf, contact)
                    values
                    ($1, $2, $3, $4)
                    returning *
                `, [dados.name, dados.email, dados.cpf, dados.contact])

            response.status(201).json(servico.rows[0])
        } catch (error) {
            response.status(500).json({ mensagem: 'Não possivel cadastrar o cliente' })
        }
    }

}

module.exports = new ClientController()