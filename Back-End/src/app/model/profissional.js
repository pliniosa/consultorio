const mongoose = require('../../database/index');


// Schema do Usuario
const ProfissionalSchema = new mongoose.Schema({

    nome: {
        type: String,
        require: true
    },
    cro: {
        type: Number,
        unique: true,
        require: true
    },

});

const Profissional = mongoose.model('profissionais', ProfissionalSchema);

module.exports = Profissional;
