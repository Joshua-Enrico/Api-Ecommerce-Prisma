/*  En este modulo tenemos una unica funcion que se encargara de crear 
    un resgistro de seller y selleruser en simultaneo, lo importante de que 
    se creen en simultaneo es porque en aplicaiones de alta disponibilidad 
    el hecho de crear no hacerlo en simultaneo significa que otro usuario ya pueda haber 
    creado exactamente el mismo usuario o seller, al final son probabilidades
    usualmente se usa transacciones de corta y larga duracion, Prisma tiene un punto de vista 
    bastante particular sobre las transacciones y ofrece endpoints para ello
    https://www.prisma.io/docs/concepts/components/prisma-client/transactions
    pero en este caso usare la funcionalidad de relaciones en prisma, consume menos y 
    se asegura que ambos registros se creen, de lo contrario todo fallara
    https://www.prisma.io/docs/concepts/components/prisma-schema/relations
    para hacer uso de esta funcionalidad el modelado de las tablas tienen que tener
    las caracteristicas necesarias*/


var CryptoJS = require("crypto-js");// Libreria para encriptamiento de contraseñas
const { PrismaClient } = require('@prisma/client'); // ORM
const prisma = new PrismaClient();

/*  Maneja un solo query de mediana complejidad,
    complicado  de reducir ya que crea dos registros */
async function createSellerAndUser(req, res){

    const { seller:sellerArgs, selleruser:selleruserArgs } = req;

    await prisma.seller.create({
        data: {
            name: sellerArgs.name,
            description: sellerArgs.description,
            address: sellerArgs.address,
            sellerusers: {
                create: [{
                    name: selleruserArgs.name,
                    email: selleruserArgs.email,
                    password: CryptoJS.SHA256(selleruserArgs.password).toString(),
                }]
            }
        },
        select: {
            id: true,
            name: true,
            description: true,
            address: true,
            sellerusers: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            }
        }
    })
    .then((seller) => {
        res.status(201).json({
            message: "seller and selleruser created",
            seller,
            code: "seller_and_selleruser_created",
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

module.exports = { createSellerAndUser };