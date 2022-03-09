const { PrismaClient } = require('@prisma/client'); // ORM
const { user } = new PrismaClient();

async function  checkNeedExistance(req, res) {
    
    const id = req.params.id;
    const flag = { isValid: true }

    await user.findUnique({
        where: {
            id: id
        },
        select: {
            id: true
        }
    })
        .then((user) => {
            if(!user){
                flag.isValid = false;
                res.status(200).json({
                    message: "User not found",
                    code: "user-not-found",
                });
            }
        })
        .catch((err) => {
            flag.isValid = false;
            res.status(500).json({
                error: "Server Error",
                err,
                message: 'Error creating user',
                code: "server-error"
            })
        })
    return flag;
}

module.exports = { checkNeedExistance }