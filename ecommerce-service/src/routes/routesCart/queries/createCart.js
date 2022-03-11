const { PrismaClient } = require('@prisma/client'); // ORM
const { cart, product } = new PrismaClient();
const prisma = new PrismaClient();


/**
 * @description crea un carrito
 * @param {*} req - Request object
 * @param {*} res - Response object
 */
async function createCart(req, res){

    const { usrSellerID, sellerId , products, total } = req.body;

    // craeting transaction
    let transaction = []

    const newCart = cart.create({
        data: {
            products: products,
            total,
            user: {
                connect: {
                    id: usrSellerID
                }
            },
            seller: {
                connect: {
                    id: sellerId
                }
            }
        },
        select: {
            id: true,
            products: true,
            total: true,
            user: {
                select: {
                    id: true,
                }
            },
            seller: {
                select: {
                    id: true,
                }
            }
        }
    })
    transaction.push(newCart)

    for (const [key, value] of Object.entries(products)) {
        const { qty } = value
        let queryObj = product.update({
            where: {
                sku: key
            },
            data: {
                quantity: {
                    decrement: qty
                }
            },
            // NOT Select
            select: {
                sku: true,
                quantity: true
            }
        })
        transaction.push(queryObj)

    }


    await prisma.$transaction(transaction)
    .then(response => {
        res.status(201).json({
            cart: response[0],
            message: "Cart created",
            code: "cart-created"
        })
    })
    .catch(err => {
        res.status(500).json({
            error: "Server Error",
            err,
            message: "Error creating cart",
            code: "server-error"
        })
    })
}

module.exports = { createCart }
