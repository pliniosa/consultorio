const express = require('express');
const Materiais = require('../model/materiais');

const router = express.Router();


router.post('/registrar', async (req, res) => {

    try {
        const materiais = await Materiais.create(req.body);
        return res.send(materiais);
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao registrar: ' + err});
    }
});


router.put('/alterar', async (req, res) =>{
    const { _id } = req.body;
    try{
        if(await Materiais.findById({ _id })){
            await Materiais.findById({ _id }).update(req.body);
            return  res.status(200).send({ mensagem: 'Alteração bem sucedida' });            
        }else{
            return res.status(400).send({ error: 'Usuario nao encantrado'});
        }  
    }catch  (err) {
        return res.status(400).send({ error: 'Erro ao registrar: ' + err});
    }
});


router.get('/retornar/:id', async (req, res) => {

    const id = req.params.id;

    try {
        if (await Materiais.findById(id)) {
            const materiais = await Materiais.findById(id);
            res.send(materiais);
        }
        return res.status(400).send({ error: 'Data nao cadastrado' });
    } catch (err) {
        return res.status(400).send({ error: 'Erro' });
    }
});

router.get('/retornarTodos', async (req, res) => {
    try {
        const materiais = await Materiais.find();
        res.send(materiais);
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao registrar: ' + err });
    }
});

router.delete('/deletar/:id', async (req, res) => {
    const id = req.params.id;
    try {
        if(await Materiais.findByIdAndDelete(id)){
           return  res.status(200).send({ mensagem: 'Material Deletado' });
        }else{
            return  res.status(400).send({ error: 'Material inexistente' });
        }
    }catch (err){
        return res.status(400).send({ error: 'Erro ao deletar: ' + err});
    }
});



module.exports = app => app.use('/materiais', router);