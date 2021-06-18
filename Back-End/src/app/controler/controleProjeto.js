const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Project = require('../model/project');
const Task = require('../model/task');

const router = express.Router();

//Parte de autenticacao
//router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
        const project = await Project.find(req.body);
        return res.send(project);
    } catch (err) {
        return res.status(400).send({error:'Error ao criar o projeto'});
    }
});

router.get('/:id', async (req, res) => {
    res.send({});
});

router.post('/', async (req, res) => {
    try {
        const project = await Project.create(req.body);
        return res.send(project);
    } catch (err) {
        return res.status(400).send({error:'Error ao criar o projeto'});
    }
});

router.put('/:id', async (req, res) => {
    res.send({});
});

router.delete('/:id', async (req, res) => {
    res.send({});
});



module.exports = app => app.use('/projeto', router);