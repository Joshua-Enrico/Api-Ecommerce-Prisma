var CryptoJS = require("crypto-js");// Libreria para encriptamiento de contraseñas
const { PrismaClient } = require('@prisma/client'); // ORM
const { admin } = new PrismaClient();

/**
 * @description Crea un nuevo admin
 * en la base de datos
 * @param {*} req - Request object 
 * @param {*} res - Response object
 */
async function createUser(req, res) {
  const { name, email, password } = req;

  await admin
    .create({
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
    })
    .then((admin) => {
      res.status(201).json({
        message: "Admin created",
        admin,
        code: "admin_created",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Error creating admin",
        err,
      });
    });
}

module.exports = { createUser };