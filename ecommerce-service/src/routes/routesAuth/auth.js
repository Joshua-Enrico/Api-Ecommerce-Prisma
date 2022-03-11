// Este modulo es el encargado de manejar las rutas de autenticacion
// Registar usuario y login a su vez de proporcionar un token de autenticacion

const { validateUser } = require('./queries/validateUser');

const router = require('express').Router();



/**
 * @description Endpoint para login de usuario
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @function validateUser - Valida usuario
 */
router.post('/login/', (req, res) => {

    validateUser(req, res);

})

module.exports = router;