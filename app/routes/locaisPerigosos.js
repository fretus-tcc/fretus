var express = require("express")
var router = express.Router()

router.get('/:cidade', function (req, res) {
    var CidadesOeste = ["barueri", "osasco", "itapevi", "jandira", "carapicuiba", "santanadeparnaiba", "pirapora"];

    var CidadesSudeste = ["diadema", "saobernado", "santoandre", "ribeiraopires", "riograndedaserra", "maua"];
    
    var CidadeNorte = ["morato", "francodarocha", "cajamar", "mairipora", "caieras"];
    
    var CidadesSudoeste = ["VargemGrandePaulista", "ItapecericadaSerra", "SaoLourencodaSerra", "Juquitiba", "EmbuGuacu", "Embudasartes", "cotia", "TaboaodaSerra"];
    
    var CidadeLeste = ["aruja", "guarulhos", "santaisabel", "Itaquaquecetuba", "FerrazdeVasconcelos", "BiritibaMirim", "Salesopolis", "Guararema", "suzano", "mogidascruzes", "poa"];
    
    function identificarZona(cidade) {
        var identificarZona = ""
        if (CidadesOeste.includes(cidade)) {
            identificarZona = "Oeste";
        } else if (CidadesSudeste.includes(cidade)) {
            identificarZona = "Sudeste";
        } else if (CidadeNorte.includes(cidade)) {
            identificarZona = "Norte";
        } else if (CidadesSudoeste.includes(cidade)) {
            identificarZona = "Sudoeste";
        } else if (CidadeLeste.includes(cidade)) {
            identificarZona = "Leste";
        } else {
            identificarZona = "Cidade não encontrada";
        }

        return identificarZona
    }
    
    var { cidade } = req.params;
    const mediaZona = 10423;
    
    var meioPerigoso = (0.10*mediaZona)+mediaZona
    var perigoso =(0.20*mediaZona)+mediaZona
    var zona = identificarZona(cidade)
    
    var perigo
    if(zona >= meioPerigoso && zona <= perigoso){
        perigo = 'meio'
    }else if(zona >= perigoso){
        perigo = 'perigosa'
    }else{
        perigo = 'segura'
    }
    
    res.json({cidade, zona, perigo})
    
})

module.exports = router