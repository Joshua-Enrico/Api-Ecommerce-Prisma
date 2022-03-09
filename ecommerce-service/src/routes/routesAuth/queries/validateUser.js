const { PrismaClient } = require('@prisma/client');
var CryptoJS = require("crypto-js");// Libreria para encriptamiento de contraseñas
const prisma = new PrismaClient();
var jwt = require('jsonwebtoken');


/*  Verifica si el email o name ya existe
    Como estamos usando tablas especificas para tipo de usuario
    Estoy que manejo un queryraw para validar la existencia en las 3 tablas
    con eso evitamos hacer 3 querys independientes a cada tabla*/
    async function validateUser(req, res) {

        const { email, password } = req.body;
        console.log(email);
    
        await prisma.$queryRaw`
            SELECT id, name, password, email, userType FROM admin WHERE email = ${email}
            union SELECT id, name, password, email, userType FROM user WHERE email = ${email} 
            union SELECT id, name, password, email, userType FROM selleruser WHERE email = ${email}`
        .then((user) => {
            if(user.length > 0){

                if (user[0].password === CryptoJS.SHA256(password).toString()) {
                    const { password, ...result } = user[0];
                    const { id , userType } = result;

                    console.log(process.env.JWTSALT);

                    const token = jwt.sign({
                        id: id,
                        userType: userType
                    }, process.env.JWTSALT, { expiresIn: '5d' });


                    res.status(201).json({
                        message: "User found",
                        code: "user-found",
                        result,
                        token
                    });
                } else {
                    res.status(201).json({
                        message: "Password incorrect",
                        code: "password-incorrect",
                    });
                }

            } else {
                res.status(201).json({
                    message: "User not found",
                    code: "user-not-found",
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: "Server error",
                err,
            });
        })
    }
    
module.exports = { validateUser };
