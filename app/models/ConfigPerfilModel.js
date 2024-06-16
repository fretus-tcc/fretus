const pool = require('../../config/connection-factory')

const PerfilModel = {

    findUserByType: async (id, type) => {
        try {
            const queryShipper = 
                'INNER JOIN detalhamento_entregador AS e ' +
                'ON u.id_usuario = e.id_usuario ' +
                'INNER JOIN veiculos AS v ' +
                'ON v.id_entregador = e.id_entregador'

            const [result] = await pool.query(
                'SELECT * FROM usuario AS u ' + 
                `${ type == 1 ? '' : queryShipper } ` +
                'WHERE u.id_usuario = ?', [id]);
            return result;
        } catch (error) {
            console.log(error)
            return error;
        }
    },

    //atualizando usuário da tabela 
    updateUser: async (data, id) => {
        try {
            await pool.query('UPDATE usuario SET ? WHERE id_usuario = ?', [data, id])
        } catch (error) {
            console.log(error)
            return error
        }
    },

    //atualizando usuário da tabela 
    updateVehicle: async (data, id) => {
        try {
            await pool.query('UPDATE veiculos SET ? WHERE id_entregador = ?', [data, id])
        } catch (error) {
            console.log(error)
            return error
        }
    },

}

// module.exports = ConfigModel
module.exports = PerfilModel