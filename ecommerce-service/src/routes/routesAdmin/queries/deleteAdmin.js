const { PrismaClient } = require('@prisma/client');
const { admin } = new PrismaClient();

/**
 * @description Elimina un admin de la base de datos
 * @param {*} req - Request object
 * @param {*} res - Response object
 */
async function deleteAdmin(req, res){
    const { id } = req.params;
    await admin.delete({
        where: {
            id: id
        },
        select: {
            id: true,
        }
    }).then((admin) => {
        console.log(admin);
        res.status(200).json({
            message: "Admin deleted",
            admin,
            code: "admin_deleted",
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            message: "Error deleting admin",
            err,
        });
    })
}

module.exports = { deleteAdmin };