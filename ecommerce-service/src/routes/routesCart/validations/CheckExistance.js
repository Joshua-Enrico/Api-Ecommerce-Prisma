const { PrismaClient } = require('@prisma/client'); // ORM
const { user, cart, seller } = new PrismaClient();

async function checkExistanceUS(req, res){

    const { usrSellerID, sellerId, products } = req.body;
    const flag = { isValid: true };
    
    await seller.findUnique({
        where: {
            id: sellerId
        },
        select: {
            id: true,
        }
    })
        .then((seller) => {
            if(!seller){
                flag.isValid = false;
                res.status(200).json({
                    message: "Seller not found",
                    code: "seller-not-found"
                })
            } else {
                for(const [key, value] of Object.entries(products)){
                    
                    if(value.sellerId !== seller.id){
                        flag.isValid = false;
                        res.status(200).json({
                            message: "Wrong Product Seller ID",
                            code: "wrong-product-seller-id"
                        })
                    }

                }
            }
        })
        .catch((err) => {
            flag.isValid = false;
            res.status(200).json({
                message: "Seller not found",
                code: "seller-not-found"
            })
        })

    return flag;
}

module.exports = { checkExistanceUS }