const { PrismaClient } = require('@prisma/client'); // ORM
const { cart } = new PrismaClient();
const prisma = new PrismaClient();

/**
 * @description Obtiene todos los carritos
 * @param {*} req - Request object 
 * @param {*} res - Response object
 */
async function getAllCarts(req, res) {

    await cart.findMany({
        select: {
            id: true,
            products: true,
            total: true,
            status: true,
            user: {
                select: {
                    id: true,
                }
            }
        }
    })
        .then((carts) => {
            res.status(200).json({
                message: "Carts found",
                code: "carts-found",
                carts
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: "Server Error",
                err,
                code: "server-error"
            })
        })

}

module.exports = { getAllCarts }
