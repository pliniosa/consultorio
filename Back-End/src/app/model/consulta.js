const mongoose = require('../../database/index');

//Schema do contato
const consultaSchema = new mongoose.Schema({

    nome: {
        type: String,
        require: true,
    },
    horario:{
        type: String,
    },
    servicoPrestado:{
        type: String,
    },
    compareceu: {
        type: String,
    },
    finalTratamento:{
        type: String,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },   
});

const Consulta = mongoose.model('consulta', consultaSchema);

module.exports = Consulta;