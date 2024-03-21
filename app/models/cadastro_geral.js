var express = require("express");
var router = express.Router();
const app = express();


var pool = require("../../config/connection-factory");

app.use(express.urlencoded({ extended: true }));

app.post('/cliente/solicitar-entrega', (req, res) => {
    const { nome, cpf, inputEmail, password } = req.body;
    
    conexao.query(
        'INSERT INTO tabela_clientes (nome, cpf, email, senha) VALUES (?, ?, ?, ?)',
        [nome, cpf, inputEmail, password],
        (err, results) => {
            if (err) {
                console.error('Erro ao inserir dados do cliente:', err);
                res.status(500).send('Erro ao inserir dados do cliente');
                return;
            }
            console.log('Dados do cliente inseridos com sucesso!');
            
            res.redirect('/outra-pagina');
        }
    );
});


app.post('/cadastro-entregador', (req, res) => {
    const { nome2, cpf2, inputEmail2, password2 } = req.body;
    
    conexao.query(
        'INSERT INTO tabela_entregadores (nome, cpf, email, senha) VALUES (?, ?, ?, ?)',
        [nome2, cpf2, inputEmail2, password2],
        (err, results) => {
            if (err) {
                console.error('Erro ao inserir dados do entregador:', err);
                res.status(500).send('Erro ao inserir dados do entregador');
                return;
            }
            console.log('Dados do entregador inseridos com sucesso!');
        
            res.redirect('/outra-pagina');
        }
    );
});

module.exports = router