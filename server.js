
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const server = express();

mongoose.connect('mongodb+srv://user_admin:CfWEe82UIIHkQRGf@apicluster-dxpzb.mongodb.net/test?retryWrites=true&w=majority', {
    reconnectTries: Number.MAX_VALUE, 
    useNewUrlParser: true,
    reconnectInterval: 500,
    poolSize: 5,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Servidor rodando...');
})

mongoose.connection.on('error', (err) => {
    console.log("Erro na conexão: " + err);
});


server.use(express.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());


const ItemRoutes = require('./controller/Item');
//const UserRoutes = require('./controller/UserRoute');
const ProjRoutes = require('./controller/ProjectControllers');

let port = process.env.PORT || 4444;
server.listen(port);
server.use(ItemRoutes);
//server.use(UserRoutes);
server.use(ProjRoutes);
