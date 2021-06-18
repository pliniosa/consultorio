const express = require('express');
const Profissional = require('../model/profissional');

const router = express.Router();

router.post('/registrar', async (req, res) => {

    const { cro } = req.body;
    try {
        if (await Profissional.findOne({ cro })) {
            return res.status(400).send({ error: 'Dentista ja cadastrado' });
        }
        const profissional = await Profissional.create(req.body);
        profissional.senha = undefined;
        return res.send({ profissional });
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao registrar: ' + err });
    }
});

router.delete('/deletar/:cro', async (req, res) => {

    const cro = req.params.cro;

    try {
        if (await Profissional.findOneAndDelete({ cro })) {
            return res.status(200).send({ mensagem: 'Dentista Deletado' });
        } else {
            return res.status(400).send({ error: 'Dentista inexistente' });
        }
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao deletar: ' + err });
    }
});

router.get('/retornarTodos', async (req, res) => {
    try {
        const profissional = await Profissional.find();
        res.send(profissional);
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao registrar: ' + err });
    }

});

router.get('/retornar', async (req, res) => {

    const { cro } = req.body;
    try {
        if (await Profissional.findOne({ cro })) {
            const profissional = await Profissional.findOne(req.body);
            res.send({ profissional });
        } else {
            return res.status(400).send({ error: 'Dentista nao encantrado' });
        }
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao registrar: ' + err });
    }
});

module.exports = app => app.use('/profissionais', router);