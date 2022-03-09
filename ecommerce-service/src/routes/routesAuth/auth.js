// Este modulo es el encargado de manejar las rutas de autenticacion
// Registar usuario y login a su vez de proporcionar un token de autenticacion

const { validateUser } = require('./queries/validateUser');

const router = require('express').Router();



/*  Login de usuario , al manejar tablas
    separadas para los tipos de usuarios 
     */
router.post('/login/', (req, res) => {

    validateUser(req, res);

})

module.exports = router;