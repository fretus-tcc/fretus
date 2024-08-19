const express = require('express');
const router = express.Router();
const pool = require('/config/connection-factory'); // Importe o pool de conexões

router.post('/generate-coupon', async (req, res) => {
    const { userId, couponCode, discountPercentage } = req.body; // Dados do formulário

    try {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            // Insere o cupom na tabela CUPONS
            const [result] = await connection.execute(
                'INSERT INTO CUPONS (code, discount_percentage) VALUES (?, ?)',
                [couponCode, discountPercentage]
            );
            
            const couponId = result.insertId;

            // Relaciona o cupom ao usuário na tabela USUARIOS_has_CUPONS
            await connection.execute(
                'INSERT INTO USUARIOS_has_CUPONS (USUARIOS_id_usuario, CUPONS_id_cupon) VALUES (?, ?)',
                [userId, couponId]
            );

            await connection.commit();
            res.status(200).json({ message: 'Cupom gerado com sucesso!' });
        } catch (err) {
            await connection.rollback();
            console.error(err);
            res.status(500).json({ message: 'Erro ao gerar o cupom' });
        } finally {
            connection.release();
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao conectar ao banco de dados' });
    }
});

module.exports = router;
