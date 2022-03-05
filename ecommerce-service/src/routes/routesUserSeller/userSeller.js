const { checkUserExistance } = require('../globalQueries/checkUserExistance');
const { dinamycVal } = require('../globalValidations/dinamycArgsValidation');
const { errUsrSellerMsg } = require('../utils/messages');
const { createSellerUser } = require('./queries/createSellerUser');
const { getAllSellersUsr } = require('./queries/getAllSellerUsers');
const { getSellerUserById } = require('./queries/getSellerUsrById');
const { searchUserSellers } = require('./queries/searchSellerUser');
const { updateSellerUsr } = require('./queries/updateSellerUsr');

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
router.get('/all', (req, res) => {

    getAllSellersUsr(req, res);

})

// Buscar Usuario por id
router.get('/:id', (req, res) => {

    getSellerUserById(req, res);

})

// Eliminar Usuario, no es buena practica eliminar un usuario, se debe desactivar
router.delete('/:id', (req, res) => {

})

// Actualizar Usuario
router.put('/:id', (req, res) => {

    const validArgs = ["sellerId", "name", "password", "email"]
    const err = dinamycVal(req.body, res, validArgs, 4, errUsrSellerMsg, true);// Valida los argumentos
    if (!err) {
        updateSellerUsr(req, res);
    }

})

// Buscar Usuario
router.get('/search/:search', (req, res) => {

    searchUserSellers(req, res);

})


module.exports = router;