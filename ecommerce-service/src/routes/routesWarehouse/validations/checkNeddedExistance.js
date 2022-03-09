const { PrismaClient } = require('@prisma/client');
const { seller, warehouse } = new PrismaClient();

async function checkNeededExistance(req, res){
    const { sellerId } = req.body;
    const id = req.params.id;
    const flag = { isValid: true};

    if (sellerId) {

        await seller.findUnique({
            where: {
                id: sellerId
            },
            select: {
                id: true
            }
        })
        .then((seller) => {
            if(!seller){
                flag.isValid = false;
                res.status(201).json({
                    message: "Seller does not exist",
                    code: "seller_does_not_exist",
                })
            }
            // pass
        })
        .catch((err) => {
            flag.isValid = false;
            res.status(500).json({
                message: "Server error",
                err,
                code: "server-error"
            })
        })
    } else if (id){

        await warehouse.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true
            }
        })
        .then((warehouse) => {
            if(!warehouse){
                flag.isValid = false;
                res.status(201).json({
                    message: "Warehouse  does not exist",
                    code: "warehouse_does_not_exist",
                })
            }
            // pass
        })
        .catch((err) => {
            flag.isValid = false;
            res.status(500).json({
                message: "Server error",
                err,
                code: "server-error"
            })
        })

    } else if (!id || typeof id !== 'string') {
        flag.isValid = false;
        res.status(400).json({
            message: "Id must be a string and a required field",
            code: "id-string"
        })
    }



    return flag;
}



module.exports = { checkNeededExistance };