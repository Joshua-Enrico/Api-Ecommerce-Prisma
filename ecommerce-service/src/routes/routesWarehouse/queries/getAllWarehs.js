const { PrismaClient } = require('@prisma/client'); // ORM
const { warehouse } = new PrismaClient();


async function getAllWarehs(res) {
    
        await warehouse.findMany({
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
        }).then((warehs) => {
            res.status(200).json({
                message: 'All warehouses found',
                warehs,
                code: "all-warehs-found"
            })
        }).catch((err) => {
            console.log(err);
            res.status(500).json({
                error: "Server Error",
                err,
                message: 'Error finding all warehs',
            })
        })
        
}

module.exports = { getAllWarehs };