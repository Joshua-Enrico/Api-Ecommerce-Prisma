const { PrismaClient } = require('@prisma/client'); // ORM
const { seller } = new PrismaClient();

/* descripcion: Actualiza valores de un seller */
async function updateSeller(req, res){ 

    const data = req.body;
    const { id } = req.params;
    
    if (id === "" || id === undefined) {
      res.status(400).json({
        message: "Id is required",
        code: "wrong_id",
      });
    } else {
        await seller.update({
            where: {
                id: id
            },
            data,
            select: {
                id: true,
                name: true,
                description: true,
                address: true,
            }
        })
        .then(seller => {
            res.status(200).json({
                message: "Seller updated",
                seller,
                code: "seller_updated",
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Error updating seller",
                err,
                code: "seller_update_error"
            });
        })
    }

}

module.exports = { updateSeller };