const resultadosModel = require('../models/resultadosModel')
const avaliacoesModel = require('../models/avaliacoesModel')

const resultadosController = {
    
    listResults: async (req, res) => {
        const { id } = req.session.autenticado
        try {
            const pedidos = await resultadosModel.findPedidoPaginate(id, 0, 10)
            // console.log(pedidos);
            
            const avaliacoes = await avaliacoesModel.findAllByEntregador(id)

            res.render('pages/entregador/resultados', { autenticado: req.session.autenticado, pedidos, avaliacoes })
        } catch (error) {
            res.json({ error })
        }
    },

    showHistorico: async (req, res) => {
        const { id } = req.session.autenticado
        try {
            // paginação
            let pagina = req.query.pagina == undefined ? 1 : Number(req.query.pagina);
            let pedidos = null
            let regPagina = 4
            let inicio = parseInt(pagina - 1) * regPagina
            let totReg = await resultadosModel.totalPedidoReg(id);
            let totPaginas = Math.ceil(totReg[0].total / regPagina);
            
            // validacao parametro pagina
            if (pagina <= 0 || isNaN(pagina)) {
                return res.redirect('/entregador/historico')
            } else if (pagina > totPaginas && totPaginas > 0) {
                return res.redirect(`/entregador/historico?pagina=${totPaginas}`)
            }

            pedidos = await resultadosModel.findPedidoPaginate(id, inicio, regPagina);
            let paginador = totReg[0].total <= regPagina 
                ? null 
                : { "pagina_atual": pagina, "total_reg": totReg[0].total, "total_paginas": totPaginas };

            res.render('pages/cliente-entregador/historico-completo', { autenticado: req.session.autenticado, isClient: false, pedidos, paginador, msgs: [] })
        } catch (error) {
            console.log(error)
            res.json({ error })
        }
    },

}

module.exports = resultadosController