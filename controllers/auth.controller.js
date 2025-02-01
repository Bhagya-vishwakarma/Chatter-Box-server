const jwt = require('jsonwebtoken');
const db = require('../config/db');
const bcrypt = require('bcrypt');
require('dotenv').config()
//Validation
const { body, validationResult } = require('express-validator');
const ValidateUser = [
    body("username").escape(),
    body("password").escape()
]
exports.PostSignIn = [ValidateUser, async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        
        const { password, email } = req.body;
        const user = await db.allUser.findUnique(
            {
                where: {
                    email: email
                }
            }
        );
        
        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                const token = jwt.sign({ username:user.username, email,id:user.id  }, process.env.JWT_SECRET_KEY);
                res.json({token})
                
            }
            else {
                res.json({ "message": "Wrong Password" });
            }
        }
        else {
            res.json({ "message": "No user Found" });
        }

    }
    else {
        res.json({ "message": "Invalid User or password" });
    }
}]

exports.PostSignUp = [ValidateUser, async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        const { username, password, email } = req.body;
        const user = await  db.allUser.findFirst(
            {
                where: {
                    OR:[
                        {email: email},
                        {username:username}
                    ]
                }
            }
        );
        if (!user) {
            const hashedPassword = await bcrypt.hash(password,10);
            const user =await db.allUser.create({
                data:{username,password:hashedPassword,email}
            });
            const token = jwt.sign({ username, email,id:user.id  }, process.env.JWT_SECRET_KEY);
            res.json({token});
        }
        else {
            res.json({ "message": "user already exist " });
        }
    }
    else {
        res.json({ "message": "Invalid User or password" });
    }
}]

