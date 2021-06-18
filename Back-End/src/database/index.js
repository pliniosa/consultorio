const mongoose = require('mongoose');
//configuração do mongoose
mongoose.connect('mongodb+srv://admin:1234567890@consultoriodb.kjmjl.mongodb.net/<dbname>?retryWrites=true&w=majority').then(() => {
    console.log("Conectado")
}).catch((err) => {
    console.log("Erro ao conectar ao BangoDB")
});
mongoose.Promise = global.Promise;

module.exports = mongoose;