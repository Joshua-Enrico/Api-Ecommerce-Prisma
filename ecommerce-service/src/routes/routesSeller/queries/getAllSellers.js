const { PrismaClient } = require('@prisma/client'); // ORM
const { seller } = new PrismaClient();


async function getAllSellers(res) {

    await seller.findMany({
        select: {
            id: true,
            name: true,
            description: true,
            address: true,
        }
    }).then((sellers) => {
        res.status(200).json({
            message: 'All seller found',
            sellers,
            code: "all-Sellers-found"
        })
    }).catch((err) => {
        res.status(500).json({
            error: "Server Error",
            err,
            message: 'Error finding all sellers',
        })
    })
    
}

module.exports = { getAllSellers };
