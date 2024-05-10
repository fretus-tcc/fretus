const FaleConoscoModel = require("../models/FaleConoscoModel");

const FaleConoscoControl = {
    MensagemFaleConosco: async (req, res) => {
        
        try {
            await FaleConoscoModel.createFaleconosco(req.body);

            res.redirect('/')


        } catch (error) {
            return error;
        }

    },
     // Detalhes
     listUsersId: async (req, res) => {
        const { id } = req.params
        try {
            const result = await FaleConoscoModel.findByUserId(id)
            res.render('pages/adm/CadastroAdmGeral/detealhesAd', { result, id })
        } catch (error) {
            res.json({ error })
        }
    },


};


module.exports = FaleConoscoControl;

