const express = require('express');
const Hora = require('../model/hora');

const router = express.Router();


router.post('/registrar', async (req, res) => {
    try {
        const hora = await Hora.create(req.body);
        res.send(hora);
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao registrar: ' + err})
    }
});


router.get('/retornar', async (req, res) => {
    try {
        const hora = await Hora.find();
        res.send(hora);
    } catch (err) {
        return res.status(400).send({ error: 'Error '  + err})
    }

});


module.exports = app => app.use('/horarios', router);