const express = require('express'); // importanto express
const routes = require('./routes'); // importanto as rotas
const mongoose = require('mongoose');
const cors = require('cors');

const app = express(); // criando servidor 
const server = require('http').Server(app);
/** Informando ao front que deu match */
const io = require('socket.io')(server);

const connectedUsers = {} ;

io.on('connection', socket => {
    const { user } = socket.handshake.query;
    connectedUsers[user] = socket.id;
});

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-g5jut.mongodb.net/omnistack8?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

app.use((req, res, next)=>{

    req.io = io;
    req.connectedUsers = connectedUsers;
    
    return next();
});


app.use(cors()); //permite que a app seja acessada por qualquer endereço
app.use(express.json()); // informando que vamos utilizar o json
app.use(routes); // usando as rotas 


server.listen('3333'); // criando porta do servidor