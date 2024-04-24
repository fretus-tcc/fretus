/* var pool = require("../../config/connection-factory");

const UsuarioLogin = {

    constructor(conexao) {
        this.conexao = conexao;
    }, 

    findAll() {
        return new Promise((resolve, reject) => {
            this.conexao.query("SELECT u.id_usuario, u.nome_usuario, u.user_usuario, " +
                "u.senha_usuario, u.email_usuario, u.fone_usuario, u.tipo_usuario," +
                " u.status_usuario, t.tipo_usuario, t.descricao_usuario FROM usuario u, tipo_usuario t where u.status_usuario = 1 and " +
                " u.tipo_usuario = t.id_tipo_usuario", function (error, elements) {
                    if (error) {
                        return reject(error);
                    }

                    return resolve(elements);
                });
        });
    },

    findUserEmail(camposForm) {
        return new Promise((resolve, reject) => {
            this.conexao.query("SELECT * FROM usuario WHERE email_usuario = ?",
            [camposForm.user_usuario, camposForm.user_usuario],
                function (error, elements) {
                    if (error) {
                        return reject(error);
                    }

                    return resolve(elements);
                });
        });
    },

    findID(id) {
        return new Promise((resolve, reject) => {
            this.conexao.query("SELECT u.id_usuario, u.nome_usuario, u.user_usuario, " +
                "u.senha_usuario, u.email_usuario, u.fone_usuario, u.tipo_usuario," +
                " u.status_usuario, t.tipo_usuario, t.descricao_usuario FROM usuario u, tipo_usuario t where u.status_usuario = 1 and " +
                " u.tipo_usuario = t.id_tipo_usuario and u.id_usuario = ?", [id], function (error, elements) {
                    if (error) {
                        return reject(error);
                    }

                    return resolve(elements);
                });
        });
    },

    create(camposJson) {
        return new Promise((resolve, reject) => {
            this.conexao.query("insert into usuario set ?",
                camposJson,
                function (error, elements) {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(elements);
                });
        });
    },
    update(camposJson) {
        return new Promise((resolve, reject) => {
            this.conexao.query(
                "UPDATE usuario SET nome_usuario = ?, user_usuario = ?, senha_usuario = ?,  " +
                " email_usuario = ?, fone_usuario = ?, tipo_usuario = ?, status_usuario = ? " +
                " WHERE id_usuario = ?",
                [camposJson.nome_usuario, camposJson.user_usuario, camposJson.senha_usuario,
                camposJson.email_usuario, camposJson.fone_usuario, camposJson.tipo_usuario,
                camposJson.status_usuario, camposJson.id_usuario
                ],
                function (error, results, fields) {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(results);
                });
        });
    },

    delete(id) {
        return new Promise((resolve, reject) => {
            this.conexao.query("UPDATE usuario SET status_usuario = 0 WHERE id_usuario = ?", [id], function (error, results) {
                if (error) {
                    return reject(error);
                }
                return resolve(results[0]);
            });
        });
    }
}
module.exports = UsuarioLogin;
 */