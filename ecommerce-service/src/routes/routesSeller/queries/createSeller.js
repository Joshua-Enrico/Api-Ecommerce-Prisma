const { PrismaClient } = require('@prisma/client'); // ORM
const { seller } = new PrismaClient();

async function createSeller(req, res) {
    const { name, description, address } = req;

    await seller.create({
        data: {
            name,
            description,
            address,
        },
        select: {
            id: true,
            name: true,
            description: true,
            address: true,
        }
    }).then((seller) => {}).catch((err) => {})
}

module.exports = { createSeller };