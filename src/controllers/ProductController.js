const { Pool } = require('pg');

const conexao = new Pool({
    user: 'postgres',     
    host: 'localhost',        
    database: 'carrinho_de_compras',  
    password: 'Kleston!123',     
    port: 5432,  
})

class ProductController{
    //Cadastro Produto
    async criar(request, response) {
        try {
            const dados = request.query

            if (!dados.name || !dados.category_id) {
                return response.status(400).json({
                    mensagem: 'name e category_id são obrigatórios!'
                })
            }

            const servico = await conexao.query(`
                INSERT into products
                    (name, amount, color, voltage, description, category_id)
                    values
                    ($1, $2, $3, $4, $5, $6)
                    returning *
                `, [dados.name, dados.amount, dados.color, dados.voltage, dados.description, dados.category_id])

            response.status(201).json(servico.rows[0])
        } catch (error) {
            response.status(500).json({ mensagem: 'Não possivel cadastrar o produto '})
        }
    }

    async listarTodos(request, response) {
        try {
            const produtos = await conexao.query("select * from products")
            response.json(produtos.rows)
        } catch (error) {
            response.status(500).json({ mensagem: 'Não possivel listar os produtos' })
        }
    }
}

module.exports = new ProductController()