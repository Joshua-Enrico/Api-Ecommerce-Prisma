var CryptoJS = require("crypto-js");// Libreria para encriptamiento de contraseñas
const { PrismaClient } = require('@prisma/client'); // ORM
const { connect } = require("../userSeller");
const { selleruser } = new PrismaClient();

async function updateSellerUsr(req, res){

    const id = req.params.id;
    const data = req.body;

    data.sellerId? (data.seller = { 
        connect: {
            id: data.sellerId
        }
     }): null;
    data.password? (data.password = CryptoJS.SHA256(data.password).toString()): null;
    delete data.sellerId;

    if (!id) {
        res.status(400).json({
            message: "selleruser id is required",
            code: "selleruser_id_required",
        })
    } else {
        await selleruser.update({
            where: {
                id: id
            },
            data,
            select: {
                id: true,
                name: true,
                email: true,
                active: true,
                seller: {
                    select: {
                        id: true,
                    }
                }
            }
        })
        .then((selleruser) => {
            res.status(200).json({
                message: "selleruser updated",
                selleruser,
                code: "selleruser_updated",
            })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: "Server error",
                err,
                code: "server_error",
            })
        })
    }
}

module.exports = { updateSellerUsr };