const axios = require('axios');
const Dev = require('../model/Dev')

module.exports = {

  async index (req, res){
    const {user} = req.headers;

    const loggedDev = await Dev.findById(user);
    const users = await Dev.find({
        // filtrando os deves que o loggedDev já interagiu, para não mostrar eles mais para o mesmo; $and  === &&
        $and: [
            { _id: { $ne: user}}, // verificando se os ids são iguais. $ne-> verifica desiqualdade 
            { _id: { $nin: loggedDev.likes} }, // verificando os devs que receberam o likes. $nin -> não esteja dentro de uma lista
            { _id: { $nin: loggedDev.dislikes  }} // verificando os devs que receberam dislikes
        ]
    });

    return res.json(users)
  },

  async store(req, res){

        const { username } = req.body;

        const userExist = await Dev.findOne({ user: username });// verificando se o usuário já existe

        if(userExist){
            return res.json(userExist);
        }
        const response = await axios.get(`https://api.github.com/users/${username}`);
        
        const {name, bio, avatar_url: avatar } = response.data

        const dev = await  Dev.create( {
                name,
                user: username,
                bio,
                avatar
            });
        return res.json(dev);  
    }
}