const mongoose = require('../../database/index');

const PorjectSchema = new mongoose.Schema({

    nome:{
        type: String,
        require: true,
    },
    descricao:{
        type: String,
        require:true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario',
        //require: true,
    },
    task:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'task',

    }],
    createAt:{
        type: Date,
        default: Date.now,
    }

});


const Porject = mongoose.model('porject', PorjectSchema);

module.exports = Porject;