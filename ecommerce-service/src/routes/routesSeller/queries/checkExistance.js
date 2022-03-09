const { checkUserExistance } = require('../../globalQueries/checkUserExistance');
const { PrismaClient } = require('@prisma/client');
const { seller } = new PrismaClient();


async function checkSellerExistance(sellerArgs, res){

    const { name } = sellerArgs;
    const flag = { isValid: true};
    flagErr = await seller.findUnique({
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
    })
    .catch((err) => {
        flag.isValid = false;
        res.status(500).json({
            message: "Server error",
            err,
        })
    })

    return flag;
}

async function checkExistance(req, res){

    const { seller:sellerArgs, selleruser:selleruserArg } = req;
    let flag = { isValid: true};
    flag = await checkUserExistance(selleruserArg, res);
    flag.isValid && (flag = await checkSellerExistance(sellerArgs, res))

    return flag;
}


module.exports = { checkExistance };
