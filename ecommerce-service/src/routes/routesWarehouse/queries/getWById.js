
const { PrismaClient } = require('@prisma/client'); // ORM
const { warehouse } = new PrismaClient();


async function getWhById(req, res) {

    const { id } = req.params;

    if (id === undefined && typeof id !== 'string') {
        res.status(400).json({
            error: "Bad Request",
            message: 'Id must be a string',
            code: "id-string"
        })
    } else {

        await warehouse.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                name: true,
                address: true,
                seller: {
                    select: {
                        id: true,
                    }
                }
            }
        })
            .then((warehouse) => {
                if (warehouse) {
                    res.status(200).json({
                        message: 'Warehouse found',
                        warehouse,
                        code: "warehouse-found"
                    })
                } else {
                    res.status(404).json({
                        error: "Not Found",
                        message: 'Warehouse not found',
                        code: "warehouse-not-found"
                    })
                }
            })
            .catch((err) => {
                res.status(500).json({
                    error: "Server Error",
                    err,
                    message: 'Error finding warehouse',
                    code: "server-error"
                })
            })
    }
}


module.exports = { getWhById };