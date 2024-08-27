const pool = require('../../config/connection-factory')
const pedidosModel = require('./pedidosModel')

const { MercadoPagoConfig, Preference } = require('mercadopago')
const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN })
const preference = new Preference(client)

const pagamentoModel = {
    
    // Cria uma preferencia com o MP (Mercado Pago)
    createPreferenceMP: async (id_pedido, uuid) => {
        try {

            const [pedido] = await pedidosModel.findById(id_pedido)

            const response = await preference.create({
                body: {
                    items: [
                        {
                            id: uuid, // UUID
                            title: 'Entrega - Fretus',
                            picture_url: 'https://fretus.onrender.com/imgs/logotca.png',
                            quantity: 1,
                            currency_id: 'BRL',
                            unit_price: Number(pedido.preco_pedido),
                        }
                    ],
                    back_urls: {
                        "success": `${process.env.SITE_URL}/cliente/feedback-pagamento`,
                        "failure": `${process.env.SITE_URL}/cliente/feedback-pagamento`,
                        "pending": `${process.env.SITE_URL}/cliente/feedback-pagamento`
                    },
                    auto_return: "approved",
                    external_reference: uuid,
                    payment_methods: {
                        excluded_payment_methods: [
                            { id: "bolbradesco" },
                            { id: "pec" }
                        ],
                        excluded_payment_types: [
                            { id: "debit_card" }
                        ],
                        installments: 1
                    }
                },
            })

            return response
            
        } catch (error) {
            console.log(error)
            return res.json({ error })
        }
    },

    /* // Consulta uma preferencia com o MP (Mercado Pago)
    getPreferenceMP: async (id) => {
        try {
            const response = await preference.get({ preferenceId: id })
            return response
        } catch (error) {
            console.log(error)
            return res.json({ error })
        }
    }, */

    insert: async (data) => {
        try {
            await pool.query('INSERT INTO pagamentos SET ?', [data])
        } catch (error) {
            return error
        }
    },

    updateByUUID: async (data, uuid) => {
        try {
            await pool.query('UPDATE pagamentos SET ? WHERE id_preferencia_mp = ?', [data, uuid])
        } catch (error) {
            return error
        }
    },
}

module.exports = pagamentoModel