const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();
const authConfig = require('../config/auth');


function geradorToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
};

//FAZER O GOOGLEGOOGLEOAUTH

router.post('/register', async (req, res) => {
    const { email } = req.body;
    try{    
        if (await User.findOne({email}))
            return res.status(400).send({erros: 'Usuario já cadastrado!'});
    
            const user = await User.create(req.body); 
        
        user.password = undefined;

        return res.send({ 
            user,
            token: geradorToken({ id: user.id }),
         });
    }
    catch (err){
        return res.status(400).send({erros: 'Falha ao registrar Usuario!'});
    }
});

router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if(!user)
        return res.status(400).send({error: 'Usuario não encontrado!'});
    
    if(!await bcrypt.compare(password, user.password))
        return res.status(400).send({error: 'Senha invalida!'});
    
    user.password = undefined;

    res.send({ 
        user, 
        token: geradorToken({id: user.id }), 
    });
});

module.exports = (server) => server.use('/userRoute', router);
