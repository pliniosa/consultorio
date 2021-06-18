const express = require('express');
const Agenda = require('../model/agenda');

const router = express.Router();


router.post('/registrar', async (req, res) => {
    const { email } = req.body;
    const { data } = req.body;
    const { hora } = req.body;
    try {
        if (await Agenda.findOne({ email })) {
            if (await Agenda.findOne({ email }).findOne({ data })) {
                return res.status(400).send({ error: 'Ja cadastrado nesta data' });
            }
            const agenda = await Agenda.create(req.body);
            return res.send(agenda);
        }
        if (await Agenda.findOne({ data }).findOne({ hora })) {
            return res.status(400).send({ error: 'Horario Reservado' });
        }
        const agenda = await Agenda.create(req.body);
        return res.send(agenda);
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Erro ao registrar: ' + err });
    }
});

router.put('/alterar', async (req, res) => {
    const { email } = req.body;
    const { data } = req.body;
    try {
        if (await Agenda.findOne({ email }).findOne({ data }) && { data } != '') {
            await Agenda.findOne({ email }).findOne({ data }).update(req.body);
            return res.status(200).send({ mensagem: 'Alteração bem sucedida' });
        } else {
            return res.status(400).send({ error: 'Usuario nao encantrado' });
        }
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao registrar: ' + err });
    }
});

router.get('/retornar/:data', async (req, res) => {

    const data = req.params.data;
    try {
        if (await Agenda.findOne({ data })) {
            const agenda = await Agenda.find({ data });
            res.send(agenda);
        }
        return res.status(400).send({ error: 'Data nao cadastrado' });
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao registrar: ' });
    }
});

router.get('/retornarProCliente/:email', async (req, res) => {

    const email = req.params.email;

    try {
        if (await Agenda.findOne({ email })) {
            const agenda = await Agenda.find({ email });
            res.send(agenda);
        }
        return res.status(400).send({ error: 'Data nao cadastrado' });
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao registrar: ' });
    }
});

router.get('/retornarTodos', async (req, res) => {
    try {
        const agenda = await Agenda.find();
        res.send(agenda);
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao registrar: ' + err });
    }
});

router.delete('/deletar/:email/:data', async (req, res) => {
    const email = req.params.email;
    const data = req.params.data;

    try {
        await Agenda.findOne({ email }).findOne({ data }).findOneAndRemove({ data });
        return res.status(400).send({ mensagem: 'Deletado com sucesso' });
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Erro ao registrar: ' + err });
    }
});

module.exports = app => app.use('/agenda', router);