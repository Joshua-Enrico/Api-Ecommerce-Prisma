const { PrismaClient } = require('@prisma/client'); // ORM
const { product } = new PrismaClient();


async function getAllProducts(req, res) {



    await product.findMany({
        select: {
            sku: true,
            name: true,
            description: true,
            price: true,
            quantity: true,
            warehouse: {
                select: {
                    id: true,
                }
            },
            seller: {
                select: {
                    id: true,
                }
            }
        }
    })
        .then((products) => {
            res.status(200).json({
                message: 'Products retrieved',
                products,
                code: "products-retrieved"
            })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: "Server Error",
                err,
                message: 'Error retrieving products',
                code: "server-error"
            })
        })

}

module.exports = { getAllProducts }
