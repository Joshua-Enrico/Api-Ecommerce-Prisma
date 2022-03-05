const { PrismaClient } = require('@prisma/client'); // ORM
const res = require('express/lib/response');
const { selleruser } = new PrismaClient();


async function getSellerUserById(req, res){
 
    const id = req.params.id;

    if (!id) {
        res.status(400).json({
            message: "selleruser id is required",
            code: "selleruser_id_required",
        })
    } else {

        await selleruser.findUnique({
            where: {
                id: id
            },
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
        })
        .then((selleruser) => {
            if (selleruser && selleruser.id ) {
                res.status(200).json({
                    message: "selleruser found",
                    selleruser,
                    code: "selleruser_found",
                })
            } else {
                res.status(404).json({
                    message: "selleruser not found",
                    code: "selleruser_not_found",
                })
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: "Server error",
                err,
                code: "server_error",
            });
        })
    }

}

module.exports = { getSellerUserById };