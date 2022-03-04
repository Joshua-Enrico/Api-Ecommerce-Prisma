const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/*  Verifica si el email o name ya existe
    Como estamos usando tablas especificas para tipo de usuario
    Estoy que manejo un queryraw para validar la existencia en las 3 tablas
    con eso evitamos hacer 3 querys independientes a cada tabla*/
async function checkUserExistance(req, res) {

    const { email, name } = req;
    const flag = { isValid: true};

    await prisma.$queryRaw`
        SELECT id FROM admin WHERE email = ${email} OR name = ${name} 
        union SELECT id FROM user WHERE email = ${email} OR name = ${name} 
        union SELECT id FROM selleruser WHERE email = ${email} OR name = ${name}`
    .then((user) => {
        if(user.length > 0){
            res.status(201).json({
                message: "name or email already exist",
                code: "name_or_email_exist",
            });
            flag.isValid = false;
        }
    })
    .catch((err) => {
        res.status(500).json({
            message: "Server error",
            err,
        });
        flag.isValid = false;
    })
    return flag
}

module.exports = { checkUserExistance };