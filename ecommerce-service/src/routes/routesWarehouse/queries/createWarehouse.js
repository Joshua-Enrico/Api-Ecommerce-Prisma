const { PrismaClient } = require('@prisma/client'); // ORM
const { warehouse } = new PrismaClient();


async function createWarehouse(req, res){
    const { name, address, sellerId } = req.body;
    await warehouse.create({
        data: {
            name: name,
            address: address,
            seller: {
                connect: {
                    id: sellerId
                }
            }
        },
        select : {
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
        res.status(201).json({
            message: 'Warehouse created',
            warehouse,
            code: "warehouse-created"
        })
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({
            error: "Server Error",
            err,
            message: 'Error creating warehouse',
            code: "server-error"
        })
    })
}

module.exports = {createWarehouse}