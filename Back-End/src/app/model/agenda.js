const mongoose = require('../../database/index');

//Schema do Agendamento
const agendaSchema = new mongoose.Schema({
    
    nome: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    profissional: {
        type: String,
        require: true,
    },
    data: {
        type:Date,
        require: true,
    },
    hora: {
        type: String,
        require: true,
    },
   
});

const Agenda = mongoose.model('agenda', agendaSchema);

module.exports = Agenda;