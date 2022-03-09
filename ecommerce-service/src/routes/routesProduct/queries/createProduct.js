const { PrismaClient } = require('@prisma/client'); // ORM
const { product } = new PrismaClient();

async function createProduct(req, res){

    const { name, description, price, stock, warehouseId, sellerId } = req.body;

    await product.create({
        data: {
            name,
            description,
            price,
            quantity: stock,
            warehouse: {
                connect: {
                    id: warehouseId
                }
            },
            seller: {
                connect: {
                    id: sellerId
                }
            }
        },
        select : {
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
        .then((product) => {
            res.status(201).json({
                message: 'Product created',
                product,
                code: "product-created"
            })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: "Server Error",
                err,
                message: 'Error creating product',
                code: "server-error"
            })
        })
}

module.exports = { createProduct }