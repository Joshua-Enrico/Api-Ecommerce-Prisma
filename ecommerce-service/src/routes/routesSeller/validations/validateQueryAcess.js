const { PrismaClient } = require('@prisma/client'); // ORM
const { admin, seller } = new PrismaClient();
const prisma = new PrismaClient();


/* Valida que el id tenga acceso al registro seller correspondiente */
async function validateQueryAcess(req, res) {

    const { userId } = req.body;
    const flag = { isValid : true };

    const verifiAdmin =  admin.findMany({
        where: {
            id: userId,
        }
    });

    const verifySellerUsr = seller.findMany({
        where: {
            sellerusers: {
                some: {
                    id: userId,
                }
            }
        }
    })

    await prisma.$transaction([verifiAdmin, verifySellerUsr])
            .then(result => {
                if(result[0].length === 0 && result[1].length === 0){
                    flag.isValid = false;
                    res.status(401).json({
                        message: "Unathorized",
                        code: "unathorized",
                    });
                }
            })
            .catch(err => {
                console.log(err);
                flag.isValid = false;
                res.status(500).json({
                    message: "Internal server error",
                    code: "internal_server_error",
                });
            })

    return flag;
}

module.exports = { validateQueryAcess };
