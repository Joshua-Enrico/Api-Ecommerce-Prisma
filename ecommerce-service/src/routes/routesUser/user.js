const { verifyToken, verifyTokenAdmin, verifyTokenUser } = require('../../authMiddleware/accessVerification');
const { checkUserExistance } = require('../globalQueries/checkUserExistance');
const { dinamycVal } = require('../globalValidations/dinamycArgsValidation');
const { errUsrMsg } = require('../utils/messages');
const { createUser } = require('./queries/createUser');
const { getAllUsers } = require('./queries/getAllUsers');
const { getUserById } = require('./queries/getUserById');
const { searchUsers } = require('./queries/searchUsers');
const { updateUser } = require('./queries/updateUser');
const { checkNeedExistance } = require('./validations/checkNeedeExistance');


const router = require('express').Router();



// Crea un usuario cliente
router.post('/', async (req, res) => {

    const validArgs = ["name", "email", "password", "address"]
    const err = dinamycVal(req.body, res, validArgs, 4, errUsrMsg, false);// Valida los argumentos
    if (!err) {
        const flag = await checkUserExistance(req.body, res);
        flag.isValid && createUser(req, res); // Si no existe el name y selle id , crea el warehouse
    }

})

// Lista de todos los usuarios
router.get('/all', verifyTokenAdmin,  (req, res) => {

    getAllUsers(res);
})

// Obtiene un usuario por id
router.get('/:id', verifyTokenAdmin, (req, res) => {
    getUserById(req, res);
})

// Elimina un usuario por id
router.delete('/:id', verifyTokenAdmin, (req, res) => {

})

//Actualiza un usuario por id
router.put('/:id', verifyTokenUser, async (req, res) => {

    const validArgs = ["name", "email", "password", "address"]

    const err = dinamycVal(req.body, res, validArgs, 4, errUsrMsg, true);// Valida los argumentos

    if (!err) {
        const flag = await checkNeedExistance(req, res);
        flag.isValid && updateUser(req, res); // Si no existe el name y selle id , crea el warehouse

    }

})

// Busca un usuario por ocurrencia de nombre, email
router.get('/search/:search', verifyTokenAdmin, async (req, res) => {
    
    searchUsers(req, res);
})


module.exports = router;
