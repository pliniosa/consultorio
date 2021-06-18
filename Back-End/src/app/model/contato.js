const mongoose = require('../../database/index');

//Schema do contato
const contatoSchema = new mongoose.Schema({

    nome: {
        type: String,
        require: true,
    },
    telefone:{
        type: Number,
        require: true,

    },
    opiniao:{
        type: String,
        require: true,

    },
    createAt: {
        type: Date,
        default: Date.now,
    },   
});

const Contato = mongoose.model('contato', contatoSchema);

module.exports = Contato;