const express = require('express');
const Consulta = require('../model/consulta');

const router = express.Router();


router.post('/registrar', async (req, res) => {

    try {
        const contato = await Consulta.create(req.body);
        return res.send(contato);
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao registrar: ' + err});
    }
});

router.put('/alterar', async (req, res) =>{
    const { _id } = req.body;
    try{
        if(await Consulta.findById({ _id })){
            await Consulta.findById({ _id }).update(req.body);
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
        if (await Consulta.findById(id)) {
            const consulta = await Consulta.findById(id);
            res.send(consulta);
        }
        return res.status(400).send({ error: 'Data nao cadastrado' });
    } catch (err) {
        return res.status(400).send({ error: 'Erro' });
    }
});


router.get('/retornarTodos', async (req, res) => {
    try {
        const consulta = await Consulta.find();
        res.send(consulta);
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao registrar: ' + err });
    }
});

router.delete('/deletar/:id', async (req, res) => {
    const id = req.params.id;
    try {
        if(await Consulta.findByIdAndDelete(id)){
           return  res.status(200).send({ mensagem: 'Consulta Deletado' });
        }else{
            return  res.status(400).send({ error: 'Consulta inexistente' });
        }
    }catch (err){
        return res.status(400).send({ error: 'Erro ao deletar: ' + err});
    }
});


module.exports = app => app.use('/consulta', router);