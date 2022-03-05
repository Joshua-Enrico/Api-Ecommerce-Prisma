var CryptoJS = require("crypto-js");// Libreria para encriptamiento de contraseñas
const { PrismaClient } = require('@prisma/client'); // ORM
const { seller, selleruser } = new PrismaClient();

async function createSellerUser(req, res) {

    const { name, email, password, sellerId} = req;
    console.log(name, email, password, sellerId);

    await selleruser.create({
        data: {
            name,
            email,
            password: CryptoJS.SHA256(password).toString(),
            seller: {
                connect: {
                    id: sellerId
                }
            }
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
    }).then((selleruser) => {
        res.status(201).json({
            message: "selleruser created",
            selleruser,
            code: "selleruser_created",
        })
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            message: "Server error",
            err,
            code: "server_error",
        })
    })


    // await seller.update({
    //     where: {
    //         id: sellerId
    //     },
    //     data: {
    //         sellerusers: {
    //             create: [
    //                 {
    //                     name,
    //                     email,
    //                     password: CryptoJS.SHA256(password).toString(),
    //                 }
    //             ]
    //         }
    //     },
    //     select: {
    //         id: true,
    //         sellerusers: {
    //             select: {
    //                 id: true,
    //                 name: true,
    //                 email: true,
    //             }
    //         }
    //     }
    // })
    // .then((seller) => {
    //     if(seller === null || seller  === undefined){
    //         res.status(404).json({
    //             message: "Seller not found",
    //             code: "seller_not_found",
    //         })
    //     } else {
    //         res.status(201).json({
    //             message: "Selleruser created",
    //             seller,
    //             code: "selleruser_created",
    //         })
    //     }
    // })
    // .catch((err) => {
    //     console.log(err);
    //     res.status(500).json({
    //         message: "Server error",
    //         err,
    //         code: "server_error",
    //     })
    // })
}

module.exports = { createSellerUser };