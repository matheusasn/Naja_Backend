const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
        categoria_item: {
                type: String, 
                lowercase: true
        },
        nome_item: {
                type: String, 
                require: true
        },
        quantidade_item: {
                type: Number, 
                require: true
        },
        valor: {
                type: Number
        },
        imagem: {
                type: String
        },
});

module.exports = mongoose.model('itens', ItemSchema);