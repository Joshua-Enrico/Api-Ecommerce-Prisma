const { checkUserExistance } = require('../globalQueries/checkUserExistance');
const { dinamycVal } = require('../globalValidations/dinamycArgsValidation');
const { errUsrSellerMsg } = require('../utils/messages');
const { createSellerUser } = require('./queries/createSellerUser');

const router = require('express').Router();


// Crear Usuario,
router.post('/', async (req, res) => {
    const validArgs = [ "sellerId", "name", "password", "email"]
    const err = dinamycVal(req.body, res, validArgs, 4, errUsrSellerMsg, false);// Valida los argumentos
    if (!err) {
        const flag = await checkUserExistance(req.body, res);// Verifica que el name y email no existan
        flag.isValid && createSellerUser(req.body, res); // Si no existe el name y email, crea el admin
    }

})


// Listar Usuarios
router.get('/all', (req, res) => {})

// Eliminar Usuario
router.delete('/:id', (req, res) => {})

// Actualizar Usuario
router.put('/:id', (req, res) => {})

// Buscar Usuario
router.get('/search/:search', (req, res) => {})


module.exports = router;