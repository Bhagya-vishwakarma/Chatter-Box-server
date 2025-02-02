const db = require('../config/db');

exports.PostCreateChat = async (req, res) => {
    const { id2 } = req.body;
    console.log(id2);
    
    const ifExist = await db.chat.findFirst({
        where: {    
            userOneId: req.user.id,
            userTwoId: id2,
        }
    });
    const user2 = await db.allUser.findFirst({ where: { id: id2 } });
    console.log({user2});
    
    if (!ifExist) {
        try {
            const chat = await db.chat.create({
                data: {
                    userOneId: req.user.id,
                    userTwoId: id2,
                },
                include: {
                    userOne: true,
                    userTwo: true,
                    messages: true
                }
            });

            res.json({ chat, user2 });
            console.log({ chat, user2 });
            
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    else{
        res.json({ chat:ifExist, user2 });
        console.log({ chat:ifExist, user2 });
    }
}

exports.getChats = async (req, res) => {
    try {
        const chats = await db.chat.findMany({
            where: {
                OR: [
                    { userOneId: req.user.id },
                    { userTwoId: req.user.id }
                ]
            },
            include: {
                userOne: true,
                userTwo: true,
                messages: {
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            }
        });
        res.json({ chats });
        // console.log({chats});
        
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}