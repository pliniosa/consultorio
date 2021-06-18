const mongoose = require('../../database/index');

//Schema do Agendamento
const horaSchema = new mongoose.Schema({

    hora: {
       type: String,
       require: true,
    }

});

const Hora = mongoose.model('horario', horaSchema);

module.exports = Hora;