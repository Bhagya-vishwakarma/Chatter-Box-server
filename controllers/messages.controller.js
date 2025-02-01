const db = require('../config/db');
exports.getAllmessages = async(req, res) => { 
  const {chatId}=req.body;
  const messages =await db.message.findMany({
    where:{
      chatId
    }
  }); 
  res.json({messages});  
}
exports.getLastMessage = async(req, res) => { 
  const {chatId}=req.body;
  const messages =await db.message.findMany({
    where:{
      chatId
    }
  }); 
  res.json({message:messages[0].content});  
}

exports.Postmessage = async (req, res) => {
  const {content,chatId}=req.body;
  const message = await db.message.create({
    data: {
      content,
      chatId,
      senderId:req.user.id,
    }
  })  
  res.json({message});
}



