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

    //Listar todos os Produtos
    async listarTodos(request, response) {
        try {
            const produtos = await conexao.query("select * from products")
            response.json(produtos.rows)
        } catch (error) {
            response.status(500).json({ mensagem: 'Não possivel listar os produtos' })
        }
    }

    //Listar detalhes do Produto
    async listarProduto(request, response) {
        try {
            const idProduto = request.params.id
            const produto = await conexao.query(`
                SELECT p.name, p.amount, p.color, p.voltage, p.description, c.name AS category_name
                FROM products p
                INNER JOIN categories c ON p.category_id = c.id 
                WHERE p.id = ${idProduto}`)
            if (produto.rows.length > 0) {
                response.status(200).json(produto.rows[0])
            }else {
                response.status(404).json({ mensagem: 'Produto não encontrado' })
            }
        } catch (error) {
            response.status(500).json({ mensagem: "Erro ao carregar o produto" })
        }
    }
}



module.exports = new ProductController()