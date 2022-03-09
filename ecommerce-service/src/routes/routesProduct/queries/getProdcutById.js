const { PrismaClient } = require('@prisma/client'); // ORM
const { product } = new PrismaClient();


async function getProductById(req, res){

    const id = req.params.id;
    await product.findUnique({

        where: {
            sku: id
        },
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
        .then((product) => {
            if(product){
                res.status(200).json({
                    message: 'Product found',
                    product,
                    code: "product-found"
                })
            } else {
                res.status(404).json({
                    message: 'Product not found',
                    code: "product-not-found"
                })
            }
        })
        .catch((err) => {
            res.status(500).json({
                error: "Server Error",
                err,
                message: 'Error getting product',
                code: "server-error"
            })
        })
}

module.exports = { getProductById }