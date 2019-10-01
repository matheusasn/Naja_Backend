const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// mongodb+srv://usuario_admin:<password>@apicluster-dxpzb.mongodb.net/test?retryWrites=true&w=majority

const url = 'mongodb+srv://user_admin:CfWEe82UIIHkQRGf@apicluster-dxpzb.mongodb.net/test?retryWrites=true&w=majority';

const options = { reconnectTries: Number.MAX_VALUE, 
                  useNewUrlParser: true,             
                  reconnectInterval: 500, 
                  poolSize: 5, 
                  useUnifiedTopology: true 
                };
                
mongoose.connect(url, options);

mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (err) => {
    console.log('Erro na conexão com o banco de dados: ' + err);
});

mongoose.connection.on('disconnected', () =>{
    console.log('Aplicação desconectada do banco dados!');
});

mongoose.connection.on('connected', () =>{
    console.log('"Servidor rodando..."');
});

//BODY PARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Conectado as rotas
require('./index')(app);
// require('./Item')(app);
// require('./UserRoute')(app);
// require('./ProjectControllers')(app);

//http://localhost:3000
app.listen(process.env.PORT || 4444);

module.exports = app;