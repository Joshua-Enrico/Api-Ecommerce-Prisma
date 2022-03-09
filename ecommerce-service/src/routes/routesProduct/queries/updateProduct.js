const { PrismaClient } = require('@prisma/client'); // ORM
const { product } = new PrismaClient();

async function updateProduct(req, res) {

    const data = req.body;
    const sku = req.params.id;

    data.password ? data.password = CryptoJS.SHA256(data.password).toString() : null;
    data.warehouseId ? data.warehouse = { connect: { id: data.warehouseId } } : null;
    data.sellerId ? delete data.sellerId : null;
    data.warehouseId ? delete data.warehouseId : null;

    await product.update({
        where: {
            sku: sku
        },
        data,
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
            if (product) {
                res.status(200).json({
                    message: 'Product updated',
                    product,
                    code: "product-updated"
                })
            } else {
                res.status(404).json({
                    message: 'Product not found',
                    code: "product-not-found"
                })
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: "Server Error",
                err,
                message: 'Error updating product',
                code: "server-error"
            })
        })
}

module.exports = { updateProduct }
