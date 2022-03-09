const { PrismaClient } = require('@prisma/client'); // ORM
const { warehouse } = new PrismaClient();

async function searchByArg(req, res) {
    const search = req.params.search;


    await warehouse.findMany({
        where: {
            OR: [
                { name: { contains: search } },
                { address: { contains: search } },
            ]
        },
        select: {
            id: true,
            name: true,
            address: true,
        }
    })
        .then((warehouses) => {
            if (warehouses.length > 0) {
                res.status(200).json({
                    message: 'Warehouses found',
                    warehouses,
                    code: "warehouses-found"
                })
            } else {
                res.status(200).json({
                    error: "Not Found",
                    message: 'Warehouses not found',
                    code: "warehouses-not-found"
                })
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: "Server Error",
                err,
                message: 'Error finding warehouses',
                code: "server-error"
            })
        })

}

module.exports = { searchByArg }
