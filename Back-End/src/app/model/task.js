const mongoose = require('../../database/index');

const TaskSchema = new mongoose.Schema({

    nome:{
        type: String,
        require: true,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario',
        //require: true,
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'porject',
        //require: true,
    },
    createAt:{
        type: Date,
        default: Date.now,
    }

});


const Task = mongoose.model('task', TaskSchema);

module.exports = Task;