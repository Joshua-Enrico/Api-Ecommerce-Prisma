const { PrismaClient } = require('@prisma/client'); // ORM
const res = require('express/lib/response');
const { selleruser } = new PrismaClient();


async function searchUserSellers(req, res){

    const searchArg = req.params.search;

    await selleruser.findMany({
        where: {
            OR: [
                {name: { contains: searchArg }},
                {email: { contains: searchArg }},
            ]

        },
        select: {
            id: true,
            name: true,
            email: true,
            seller: {
                select: {
                    id: true,
                }
            },
            active: true,
        }
    })
    .then((sellerusers) => {
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
    })
    .catch((err) => {
        res.status(500).json({
            message: "Server error",
            err,
            code: "server_error",
        })
    })

}

module.exports = { searchUserSellers };
