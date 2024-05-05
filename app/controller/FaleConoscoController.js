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


};


module.exports = FaleConoscoControl;

