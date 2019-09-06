const Dev = require('../model/Dev');

module.exports = {

  async  store(req, res){
        const {user} =  req.headers; // deu likes  
        const {devId} = req.params; // recebe likes       

        const loggedDev = await Dev.findById(user) // usuário logado
        const targetDev = await Dev.findById(devId)  // recebe o like

        if(!targetDev){
            return res.status(400).json({error: 'Dev not exist'});
        }

        // removendo o like e salvar
        loggedDev.dislikes.push(targetDev._id);
        await loggedDev.save(); // save está informação

        return res.json(loggedDev); 
    }
}
