const mongoose = require('../../database/index');

//Schema do contato
const servicoSchema = new mongoose.Schema({

    nome: {
        type: String,
        require: true,
    },
    precoUnitario: {
        type: Number,
        require: true,
    },
    total:{
        type: Number,
        require: true,
    },
    quantidade:{
        type: Number,
        require: true,
    },
    createAt: {
        type: Date,
        default: Date.now,
    }, 
});

const Materiais = mongoose.model('materiais', servicoSchema);

module.exports = Materiais;