const { PrismaClient } = require('@prisma/client');
const { admin } = new PrismaClient();

async function updateAdmin(req, res){
    const data = req.body;
    await admin.update({
        where: {
            id: req.params.id
        },
        data,
        select: {
            id: true,
            name: true,
            email: true,
            active: true,
        }
    }).then(admin => {
            res.status(200).json({
                message: "Admin updated",
                admin,
                code: "admin_updated",
            });
        }).catch(err => {
            res.status(500).json({
                message: "Error updating admin",
                err,
                code: "admin_update_error"
            });
        })
}

module.exports = { updateAdmin };