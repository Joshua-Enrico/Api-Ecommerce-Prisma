const { PrismaClient } = require('@prisma/client'); // ORM
const { user } = new PrismaClient();

async function updateUser(req, res) {

    const data  = req.body;
    data.password ? data.password = CryptoJS.SHA256(data.password).toString() : null;

    const id = req.params.id;

    await user.update({
        where: {
            id: id
        },
        data,
        select: {
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
            } else {
                res.status(200).json({
                    message: "User updated",
                    user,
                    code: "user-updated"
                })
            }
        })
        .catch((err) => {})


}


module.exports = { updateUser }