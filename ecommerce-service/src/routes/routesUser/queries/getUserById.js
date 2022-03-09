const { PrismaClient } = require('@prisma/client'); // ORM
const { user } = new PrismaClient();


async function getUserById(req, res){
    const id = req.params.id;

    if (!id) {
        res.status(400).json({
            message: "Bad request",
            code: "bad-request",
        });
    } else {

        await user.findUnique({
            where: {
                id: id
            },
            select : {
                id: true,
                name: true,
                email: true,
                address: true,
            }
        })
            .then((user) => {
                if(!user){
                    res.status(404).json({
                        message: "User not found",
                        code: "user-not-found",
                    });
                } else{
                    res.status(200).json({
                        message: "User found",
                        user,
                        code: "user-found"
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

}

module.exports = { getUserById }