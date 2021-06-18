const mongoose = require('../../database/index');
const bcrypt = require('bcryptjs');

// Schema do Usuario
const UsuarioSchema = new mongoose.Schema({

    nome:{
        type: String,
        require: true,
    },
    rua: {
        type: String,
        require: true,
    },
    numero:{
        type: Number,
        require: true,
    },
    cidade:{
        type: String,
        require: true,
    },
    telefone:{
        type: Number,
        require: true,
    },
    email:{
        type: String,
        unique: true,
        require: true,
        lowercase: true,
    },
    senha:{
        type: String,
        require: true,
        select: false,
    },
    /*para identificar o administrador*/
    adm: {
        type: Boolean,
    },

});

UsuarioSchema.pre('save', async function(next) { 
    const hash = await bcrypt.hash(this.senha, 10);
    this.senha = hash;

    next();
});

const Usuario = mongoose.model('usuario', UsuarioSchema);

module.exports = Usuario;