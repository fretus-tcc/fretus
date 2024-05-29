// Criação de usúario no Banco de Dados 
var pool = require("../../config/connection-factory");
/* const bycrypt = require('bcryptjs')
const salt = bycrypt.genSaltSync(10) */

const tarefasModel = {
    create: async (data) => {
        try {
            const result = await pool.query(
                'INSERT INTO usuario (`nome_usuario`, `data_usuario`, `telefone_usuario`, `cpf_usuario`, `email_usuario`, `senha_usuario`, `tipo_usuario`) VALUES (?, ?, ?, ?, ?, ?, ?) ',
                [data.nome, data.nasc, data.tel, data.cpf, data.email, /* bycrypt.hashSync( */data.senha/*, salt ) */, data.type]
            );
            return result
            
        } catch (error) {
            throw error; 
        }
    },
    findByEmail: async (data, id) => {
        try { 
            const [linhas] = await pool.query(`SELECT * FROM usuario WHERE email_usuario = ? ${id ? 'AND id_usuario != ?' : ''}` , [ data, id ])
            
            return linhas;
        } catch (error) {
            return error;
        }
    },
    findByCpf: async (data, id) => {
        try {
            const [linhas] = await pool.query(`SELECT * FROM usuario WHERE cpf_usuario  = ? ${id ? 'AND id_usuario != ?' : ''}`,  [ data, id ])
            
            return linhas;
        } catch (error) {
            return error;
        }
    },
    findByTel: async (data, id) => {
        try {
            const [linhas] = await pool.query(`SELECT * FROM usuario WHERE telefone_usuario = ? ${id ? 'AND id_usuario != ?' : ''}` ,  [ data, id ])
            
            return linhas;
        } catch (error) {
            return error;
        }
    },
    findBySubscribe: async (id) => {
        try {
            const [linhas] = await pool.query(
                'SELECT u.id_usuario, u.nome_usuario, e.status_aprovacao FROM usuario AS u ' +
                'INNER JOIN detalhamento_entregador AS e ' +
                'ON u.id_usuario = e.id_usuario ' +
                'WHERE u.id_usuario = ?' ,  [ id ])
            
            return linhas;
        } catch (error) {
            return error
        }
    },
    findByApproved: async (id) => {
        try {
            const [linhas] = await pool.query(
                'SELECT u.id_usuario, u.nome_usuario, e.status_aprovacao FROM usuario AS u ' +
                'INNER JOIN detalhamento_entregador AS e ' +
                'ON u.id_usuario = e.id_usuario ' +
                'WHERE u.id_usuario = ? AND e.status_aprovacao = 2' ,  [ id ])
            
            return linhas;
        } catch (error) {
            return error
        }
    },
    updateUser: async (data, id) => {
        try {
            const [linhas] = await pool.query(`UPDATE usuario SET ? WHERE id_usuario = ?` ,  [ data, id ])
            return linhas;
        } catch (error) {
            return error;
        }
    },
    insertShipper: async (data) => {
        try {
            const [linhas] = await pool.query(`INSERT INTO detalhamento_entregador SET ?`, [data] )
            // console.log(linhas)
            return linhas;
        } catch (error) {
            console.log(error);
            return error;
        }
    },
    insertVehicle: async (data) => {
        try {
            const [linhas] = await pool.query(`INSERT INTO veiculos SET ?`, [data] )
            // console.log(linhas)
            return linhas;
        } catch (error) {
            console.log(error);
            return error;
        }
    },
};


module.exports = tarefasModel;