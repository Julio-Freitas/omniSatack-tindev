const Dev = require('../model/Dev');

module.exports = {
  async  store(req, res){
    console.log(req.io, req.connectedUsers);
        const { user } =  req.headers; // deu likes  
        const { devId } = req.params; // recebe likes       

        const loggedDev = await Dev.findById(user) // usuário logado
        const targetDev = await Dev.findById(devId)  // recebe o like

        if(!targetDev){
            return res.status(400).json({error: 'Dev not exist'});
        }

        // verificando se um deu match
        if(targetDev.likes.includes(loggedDev._id)){

                const loggedSocket = req.connectedUsers[user]
                const targetSocket = req.connectedUsers[devId]
                
                if(loggedSocket){
                    req.io.to(targetSocket).emit('match', targetDev);
                }
                
                if(targetSocket){
                    req.io.to(loggedSocket).emit('match',loggedDev );
                }
        }


        // encontrou  quem vai receber o like, add o id no array de likes do usuário logado
        loggedDev.likes.push(targetDev._id);

        await loggedDev.save(); // save está informação 

        return res.json(loggedDev); 
    }
}


