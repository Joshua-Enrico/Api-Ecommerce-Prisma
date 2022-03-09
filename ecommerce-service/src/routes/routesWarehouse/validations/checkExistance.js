const { PrismaClient } = require('@prisma/client');
const { seller, warehouse } = new PrismaClient();

async function checkExistance(args, res){
    const { name, sellerId } = args;
    const flag = { isValid: true};
    console.log(name, sellerId);
    await seller.findUnique({
        where: {
            name,
        },
        select: {
            id: true
        }
    })
    .then((user) => {
        if(user && user.length > 0){
            flag.isValid = false;
            res.status(201).json({
                message: "name  already exist",
                code: "name_or_email_exist",
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

    await warehouse.findUnique({
        where: {
            id: sellerId,
        },
        select: {
            id: true
        }
    })
    .then((user) => {
        if(user && user.length > 0){
            flag.isValid = false;
            res.status(201).json({
                message: "Warehouse  already exist",
                code: "warehouse_exist",
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
    return flag;
}



module.exports = { checkExistance };