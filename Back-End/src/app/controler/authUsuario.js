const express = require('express');
const bcrypt =  require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/auth.json');
const Usuario = require('../model/usuario');
//Funcionando
const router = express.Router();

function generateToken(params = {}){
    return jwt.sign(params, config.segredo, {
        expiresIn: 86400,
    });
}

router.post('/registrar', async (req, res) => {
    const { email } = req.body;
    let nome = '';
    let  adm = '';
    try{
        if(await Usuario.findOne({ email })){
            return res.status(400).send({ error: 'Email ja cadastrado' });
        }
        const usuario = await Usuario.create(req.body);
        usuario.senha = undefined;
        usuario.senha = undefined;
        adm = usuario.adm;
        nome = usuario.nome;
        return res.send({ email, adm, nome, token: generateToken({ id: usuario.id }) });
    }catch  (err) {
        return res.status(401).send({ error: 'Erro ao registrar: '+ err});
    }
});

router.post('/autenticar', async (req, res) => {
    const { email, senha } = req.body;
    let nome = '';
    let  adm = '';
    const usuario = await Usuario.findOne({ email }).select('+senha');

    if(!usuario){
        return res.status(401).send({ error: 'Usuario nao encantrado'});        
    }

    if(!await bcrypt.compare(senha, usuario.senha)){
        return res.status(401).send({ error: 'Senha invalida'});
    }

    usuario.senha = undefined;
    adm = usuario.adm;
    nome = usuario.nome;
    res.send({ email, adm, nome, token: generateToken({ email: usuario.email}) });
});

/* Colocar os GRUDs abaixo para serem feito apos uma verificacao de autenticacao*/
router.delete('/deletar', async (req, res) => {
    const { email } = req.body;
    try {
        if(await Usuario.findOneAndDelete({email})){
           return  res.status(200).send({ mensagem: 'Usuario Deletado' });
        }else{
            return  res.status(400).send({ error: 'Usuario inexistente' });
        }
    }catch (err){
        return res.status(400).send({ error: 'Erro ao deletar: ' + err});
    }
});

router.get('/retornar/:email', async (req, res) =>{
    
    const email = req.params.email;

    try{
        if(await Usuario.findOne({ email })){
            const usuario = await Usuario.find({email});
            res.send(usuario);
        }else{
            return res.status(400).send({ error: 'Usuario nao encontrado'});
        }  
    }catch  (err) {
        return res.status(400).send({ error: 'Erro ao registrar: ' + err});
    }
});

router.get('/retornarTodos', async (req, res) =>{

    try{
            const usuario = await Usuario.find();
            res.send(usuario);
    }catch  (err) {
        return res.status(400).send({ error: 'Erro ao registrar: ' + err});
    }
});

router.put('/alterar', async (req, res) =>{
    const { email } = req.body;
    try{
        if(await Usuario.findOne({ email })){
            await Usuario.findOne({ email }).update(req.body);
            return  res.status(200).send({ mensagem: 'Alteração bem sucedida' });            
        }else{
            return res.status(400).send({ error: 'Usuario nao encantrado'});
        }  
    }catch  (err) {
        return res.status(400).send({ error: 'Erro ao registrar: ' + err});
    }
});

module.exports = app => app.use('/auth', router);