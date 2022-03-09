const { PrismaClient } = require('@prisma/client'); // ORM
const { user } = new PrismaClient();


async function getAllUsers(res){
    await user.findMany({
        select : {
            id: true,
            name: true,
            email: true,
            address: true,
        }
    })
        .then((users) => {
            res.status(201).json({
                message: 'Users found',
                users,
                code: "users-found"
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

module.exports = { getAllUsers }