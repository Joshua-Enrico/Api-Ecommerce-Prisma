const { PrismaClient } = require('@prisma/client'); // ORM
const { seller } = new PrismaClient();

async function getSellerById(req, res){ 

    const { id } = req.params;
    if (id === "" || id === undefined) {
      res.status(400).json({
        message: "Id is required",
        code: "wrong_id",
      });
    } else {
        await seller.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                name: true,
                description: true,
                address: true,
            }
        })
        .then(seller => {
            res.status(200).json({
                message: "Seller found",
                seller,
                code: "seller_found",
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Error finding seller",
                err,
                code: "seller_find_error"
            });
        })
    }


}

module.exports = { getSellerById };
