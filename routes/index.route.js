const {Router} = require('express');
const indexRouter = Router();
const messageController = require('../controllers/messages.controller')
const authController  = require('../controllers/auth.controller')
const userController = require('../controllers/users.controller');
const chatsController = require('../controllers/chats.controller');
//! authorization middleware
const {authMiddleware} = require('../middleware/authorization');

//! auth 
indexRouter.post('/signin',authController.PostSignIn);
indexRouter.post('/signup',authController.PostSignUp);

//! chat 
indexRouter.post('/createchat',authMiddleware,chatsController.PostCreateChat);
indexRouter.get('/chats',authMiddleware,chatsController.getChats);


// ! messages
indexRouter.post('/messages',authMiddleware, messageController.getAllmessages);
indexRouter.post('/messages/new',authMiddleware,messageController.Postmessage);
indexRouter.post('/lastMessage',authMiddleware,messageController.getLastMessage);

//! users
indexRouter.get('/user',authMiddleware,userController.getUsername);
indexRouter.post('/getUserId',authMiddleware,userController.getUserIdFromUsername);


module.exports=indexRouter;