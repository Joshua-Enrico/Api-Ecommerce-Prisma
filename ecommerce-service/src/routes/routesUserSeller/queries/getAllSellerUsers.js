const { PrismaClient } = require('@prisma/client'); // ORM
const { selleruser } = new PrismaClient();


async function getAllSellersUsr(req, res) {
 
    await selleruser.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            seller: {
                select: {
                    id: true,
                }
            }
        }
    }).then((sellerusers) => {
        if (sellerusers.length > 0) {
            res.status(200).json({
                message: "sellerusers found",
                sellerusers,
                code: "sellerusers_found",
            })
        } else {
            res.status(404).json({
                message: "sellerusers not found",
                code: "sellerusers_not_found",
            })
        }
    }).catch((err) => {
        res.status(500).json({
            message: "Server error",
            err,
            code: "server_error",
        })
    })    

}

module.exports = { getAllSellersUsr };