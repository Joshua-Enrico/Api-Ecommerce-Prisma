var CryptoJS = require("crypto-js");// Libreria para encriptamiento de contraseñas
const { PrismaClient } = require('@prisma/client'); // ORM
const { selleruser } = new PrismaClient();

async function createSellerUser(req, res) {

    const { name, email, password } = req;

    await selleruser.create({
        data: {
            name,
            email,
            password: CryptoJS.SHA256(password).toString(),// Encripta la contraseña
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
        }
    }).then((selleruser) => {
        res.status(200).json({
            message: "Seller user created",
            selleruser,
            code: "selleruser_created",
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            message: "Error creating seller user",
            err,
            code: "selleruser_error_at_creation",
        });
    })
}

module.exports = { createSellerUser };