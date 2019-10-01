
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const ItemRoutes = require('./routes/ItemRoutes');
const UserRoutes = require('./routes/UserRoutes');

const server = express();

mongoose.connect('mongodb+srv://user_admin:CfWEe82UIIHkQRGf@apicluster-dxpzb.mongodb.net/test?retryWrites=true&w=majority', {
    reconnectTries: Number.MAX_VALUE, 
    useNewUrlParser: true,
    reconnectInterval: 500,
    poolSize: 5,
    useUnifiedTopology: true 
});

mongoose.connection.on('connected', () => {
    console.log('Conectado com o banco de dados MLab!');
})

mongoose.connection.on('error', (err) => {
    console.log("Erro na conexão com o banco de dados MLab: " + err);
});


app.use(express.json());
app.use(ItemRoutes);
app.use(UserRoutes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


let port = process.env.PORT || 4444;
app.listen(port);
