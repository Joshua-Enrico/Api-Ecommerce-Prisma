const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * 
 * @param {*} req express request object
 * @param {*} res express response object
 * @returns { isValid: boolean} isValid: boolean
 * @description check if user exists in database
 * if not return false and http response with error message
 */
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