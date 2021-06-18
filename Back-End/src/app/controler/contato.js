const express = require('express');
const Contato = require('../model/contato');

const router = express.Router();

router.post('/registrar', async (req, res) => {

    try {
        const contato = await Contato.create(req.body);
        return res.send(contato);
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao registrar: ' + err});
    }
});

router.delete('/deletar', async (req, res) => {
    const { id } = req.body;
    try {
        if (await Contato.findOneAndDelete({ id })) {
            return res.status(200).send({ mensagem: 'Observação Deletado' });
        } else {
            return res.status(400).send({ error: 'Observação inexistente' });
        }
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao deletar: ' + err});
    }
});

router.get('/retornar', async (req, res) => {

    try {
        const contato = await Contato.find();
        res.send(contato);
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao registrar: ' + err});
    }

});

module.exports = app => app.use('/contato', router);