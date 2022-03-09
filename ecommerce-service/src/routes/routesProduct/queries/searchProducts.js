const { PrismaClient } = require('@prisma/client'); // ORM
const { product } = new PrismaClient();


async function searchProducts(req, res) {

    const search = req.params.search;
    console.log(search);
    await product.findMany({
        where: {
            OR: [
                { name: { contains: search } },
                { description: { contains: search } },
                { description: { contains: search } },
            ]
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
        .then((products) => {
            if(products.length > 0){
                res.status(200).json({
                    message: 'Products retrieved',
                    products,
                    code: "products-retrieved"
                })
            } else {
                res.status(200).json({
                    message: 'Products not found',
                    code: "products-not-found"
                })
            }
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

module.exports = { searchProducts }
