const { Pool } = require('pg');

const conexao = new Pool({
    user: 'postgres',     
    host: 'localhost',        
    database: 'carrinho_de_compras',  
    password: 'Kleston!123',     
    port: 5432,  
})

class OrderController{

    async cart(request,response) {
        try {
            const dados = request.body
            let total = 0;

            for (let i = 0; i < dados.products.length; i++) {
                const item = dados.products[i];
                const produtoAtual = await conexao.query(`
                    SELECT price FROM products 
                    WHERE id = $1
                `, [item.product_id]);
    
                total = total + (produtoAtual.rows[0].price * item.amount);
            }
    
            // INSERIR o pedido 
            const meuPedido = await conexao.query(`
                INSERT INTO orders (client_id, address, observations, total)
                values ($1,$2,$3,$4)
                returning *
                `, [dados.client_id, dados.address, dados.observations, total])
    
            // INSERIR os items
            dados.products.forEach(async item => {
                const produtoAtual = await conexao.query(`
                    SELECT price from products 
                    where id = $1
                    `, [item.product_id])
    
                conexao.query(`
                    INSERT INTO orders_items (order_id, product_id, amount, price)
                    values ($1,$2,$3,$4)
                    returning *
                    `, [
                    meuPedido.rows[0].id,
                    item.product_id,
                    item.amount,
                    produtoAtual.rows[0].price
                ])
            })
          
            response.status(201).json({mensagem: 'criado com sucesso'})
        } catch (error) {
            response.status(500).json({ mensagem: 'Não possivel montar o carrinho '})
        }
    }

}

module.exports = new OrderController()