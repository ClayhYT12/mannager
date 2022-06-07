import User from '../models/User.js';

class SessionController{
    store(req,res){
        const {email} = req.body;
        const {password} = req.body;
        return res.json({message:'minha api'});
    }
}

export default new SessionController(); 