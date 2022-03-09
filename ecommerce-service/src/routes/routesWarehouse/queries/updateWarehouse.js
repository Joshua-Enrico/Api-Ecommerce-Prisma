const { PrismaClient } = require('@prisma/client'); // ORM
const { warehouse } = new PrismaClient();

async function updateWarehouse(req, res){
    const data = req.body;

    // Modelando el query object
    data.sellerId ? (data.seller = {
        connect: {
            id: data.sellerId
        }
    }): null;
    delete data.sellerId;//ya no necesitaremos este campo

    const id = req.params.id;


    await warehouse.update({
        where: {
            id: id
        },
        data,
        select: {
            id: true,
            name: true,
            address: true,
            seller: {
                select: {
                    id: true,
                }
            }
        },
        
    })
    .then((warehouse) => {
        if(warehouse){
            res.status(200).json({
                message: "Warehouse updated",
                warehouse,
                code: "warehouse-updated"
            })
        } else {
            res.status(404).json({
                message: "Warehouse not found",
                code: "warehouse-not-found"
            })
        }
    })


}

module.exports = { updateWarehouse };