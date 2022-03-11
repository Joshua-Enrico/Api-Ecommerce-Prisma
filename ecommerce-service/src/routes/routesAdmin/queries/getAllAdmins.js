const { PrismaClient } = require('@prisma/client');
const { admin } = new PrismaClient();

/**
 * @description Obtiene todos los admins
 * de la base de datos
 * @param {*} res - Response object
 */
async function getAllAdmins(res){

    await admin.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            updatedAt: true,
            createdAt: true,
            active: true,
        }})
        .then((admins) => {
            res.status(200).json({
                message: "Admins list",
                admins,
                code: "admins_list",
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Error getting admins",
                err,
                code: "error_getting_admins",
            });
        })

}

module.exports = { getAllAdmins };