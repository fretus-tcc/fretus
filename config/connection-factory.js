var mysql = require("mysql2");

module.exports = function(){
  try {
    let conexao = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "fretus",
      port: 3306
    }).promise()
    console.log('Conexão estabelecida!')
    return conexao
  } catch (e) {
    console.log('Falha ao estabelecer conexão!')
    console.log(e)
    return null
  }
} 