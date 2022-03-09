const { PrismaClient } = require('@prisma/client'); // ORM
const { warehouse, product } = new PrismaClient();

async function checkExistanceSW(req, res, estrictMode = true){

    const { warehouseId, sellerId } = req.body;
    const flag = { isValid: true};
    console.log(warehouseId, sellerId);
    if(warehouseId){

        await warehouse.findUnique({
            where: {
                id: warehouseId
            },
            select: {
                id: true,
                seller: {
                    select: {
                        id: true,
                    }
                }
            }
        })
            .then((warehouse) => {
                if(!warehouse){
                    flag.isValid = false;
                    res.status(404).json({
                        message: 'Warehouse not found',
                        code: "warehouse-not-found"
                    })
                } else if (warehouse.seller.id !== sellerId){
                    flag.isValid = false;
                    res.status(404).json({
                        message: 'Wrong sellerId',
                        code: "wrong-sellerId"
                    })
                }
            })
            .catch((err) => {
                console.log(err);
                flag.isValid = false;
                res.status(500).json({
                    message: 'Server error',
                    err,
                    code: "server-error"
                })
            })
    }
    return flag
}

async function checkNeededExistance(req, res){

    const sku = req.params.id;
    const flag = await checkExistanceSW(req, res);

    if(flag.isValid){
        await product.findUnique({
            where: {
                sku: sku
            },
            select: {
                sku: true,
            }
        })
            .then((product) => {
                if(!product){
                    flag.isValid = false;
                    res.status(404).json({
                        message: 'Product not found',
                        code: "product-not-found"
                    })
                }
            })
            .catch((err) => {
                flag.isValid = false;
                res.status(500).json({
                    message: 'Server error',
                    err,
                    code: "server-error"
                })
            })
    }
    return flag;
}


module.exports = { checkExistanceSW, checkNeededExistance }
