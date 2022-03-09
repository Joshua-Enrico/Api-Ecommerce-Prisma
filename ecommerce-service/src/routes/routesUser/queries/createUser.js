const { PrismaClient } = require('@prisma/client'); // ORM
const { user } = new PrismaClient();
const CryptoJS = require('crypto-js');

async function createUser(req, res){

    const { name, email, password, address } = req.body;
    await user.create({
        data: {
            name,
            email,
            password: CryptoJS.SHA256(password).toString(),
            address
        },
        select : {
            id: true,
            name: true,
            email: true,
            address: true,
        }
    })
        .then((user) => {
            res.status(201).json({
                message: 'User created',
                user,
                code: "user-created"
            })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: "Server Error",
                err,
                message: 'Error creating user',
                code: "server-error"
            })
        })


}

module.exports = { createUser }