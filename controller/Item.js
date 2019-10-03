const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const util = require('./Util');


router.get('/', (req, res) => {
    Item.find({}, (err, data) =>{
        if(err) return res.json({error: 'Erro ao consultar item!'});
        return res.json(data);
    });
    
});

router.post('/criar', (req, res) => {
    const {nome_item, quantidade_item, categoria_item} = req.body;

    if(!nome_item || !quantidade_item || !categoria_item) return res.json({error: 'Cadastro invalido: Dados insuficientes!'});  
    Item.findOne({nome_item}, (err, data)=>{

        if (err) return res.json({error: 'Erro ao buscar item!'});
        if (data) return res.json({error: 'Item já cadastrado!'});
        
        Item.create(req.body, (err, data) => {
            if (err) res.json({error: 'Erro ao cadastrar Item!'});
            return res.json(data);
        });
    });
});

router.get('/categoria', async (req, res) =>  {
    const categoria_item = req.query.categoria_item;
    if(!categoria_item == 'tvs' || !categoria_item == 'eletrodomésticos' || !categoria_item == 'videogames' || !categoria_item == 'celulares') 
        return res.json({ error: 'Categoria de item não encontrada' });

    const itens = await Item.find({ categoria_item });

        const result = util.ordenaItem(itens);
        return res.json(result); 
});

router.delete('/remove', async (req, res) => {
    const id = req.query.id;
    
    if(!id) return res.json({error: 'id do Item não encontrado!'});
    const item = await Item.findByIdAndDelete(id);
    return res.json(item);
});

router.put('/atualiza', async (req, res) =>{
    const {id, quantidade, tipo} = req.body;
    
    if(!id) return res.json({error: 'item não encontrado'});
    
    const item = await Item.findById(id);

    if(tipo == "increase")
        item.quantidade_item += quantidade;
    else
        item.quantidade_item -= quantidade;
    
    await item.save();
    return res.json(item);

});

module.exports = router;



