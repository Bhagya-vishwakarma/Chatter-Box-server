const db = require('../config/db');
exports.getUsername=(req,res)=>{    
    res.json({user : req.user}) 
}
exports.getUserIdFromUsername= async(req,res)=>{   
    const {username}=req.body;
    const user =  await db.allUser.findFirst({
        where:{
            username
        }
    })
    const userId = user.id;
    res.json({userId});
}
