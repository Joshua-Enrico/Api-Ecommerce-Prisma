const { PrismaClient } = require('@prisma/client'); // ORM
const { user } = new PrismaClient();

async function searchUsers(req, res){

    const search = req.params.search;

    await user.findMany({
        where: {
            OR: [
                { name: { contains: search } },
                { email: { contains: search } },
                { address: { contains: search } },
            ]
        },
        select: {
            id: true,
            name: true,
            email: true,
            address: true,
        }
    })
        .then((users) => {
            if(users.length < 1){
                res.status(200).json({
                    error: "No users found",
                    message: "Users not found",
                    code: "users-not-found",
                });
            } else {
                res.status(200).json({
                    message: "Users found",
                    users,
                    code: "users-found"
                })
            }

        })
        .catch((err) => {
            res.status(500).json({
                error: "Server Error",
                err,
                message: 'Error creating user',
                code: "server-error"
            })
        })

}

module.exports = { searchUsers }