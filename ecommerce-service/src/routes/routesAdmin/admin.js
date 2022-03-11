// Contiene los endpoints para el admin
// listar sellers , editar , eliminar , crear , etc, buscar admin por id , nombre , etc
// ------------------------------------------------------------------------------------------------
const router = require('express').Router();
const { checkUserExistance } = require('../globalQueries/checkUserExistance');
const { createUser } = require('./queries/createAdmin');
const { deleteAdmin } = require('./queries/deleteAdmin');
const { getAllAdmins } = require('./queries/getAllAdmins');
const { searchAdmin } = require('./queries/searchAdmin');
const { updateAdmin } = require('./queries/updateAdmin');
const { updateArgsV } = require('./validations/updateArgsValidation');
const { errMessages } = require('../utils/messages');
const { dinamycVal } = require('../globalValidations/dinamycArgsValidation');
const { verifyTokenAdmin } = require('../../authMiddleware/accessVerification');

/**
 * @description Endpoint para crear un nuevo admin
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @function verifyTokenAdmin - Verifica que el token sea valido
 * @function dinamycVal - Valida los datos que se reciben
 * @function checkUserExistance - Verifica que el usuario no exista en la base de datos
 * @function createUser - Crea un nuevo usuario en la base de datos
 */
router.post('/',verifyTokenAdmin, async (req, res) => {

    const validArgs = ["name", "email", "password"];
    const err = dinamycVal(req.body, res, validArgs, 3, errMessages, false );// Valida los argumentos
    if (!err) {
        const flag = await checkUserExistance(req.body, res);// Verifica que el name y email no existan
        flag.isValid && createUser(req.body, res); // Si no existe el name y email, crea el admin
    }

})


/**
 * @description Endpoint para obtener todos los admins
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @function verifyTokenAdmin - Verifica que el token sea valido
 * @function getAllAdmins - Obtiene todos los admins desde la base de datos
 */
router.get('/all',verifyTokenAdmin, (req, res) => {

    getAllAdmins(res);// Esta funcion maneja el query y response
})


/**
 * @description Endpoint para eliminar un admin por id
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @function deleteAdmin - Elimina un admin de la base de datos
 */
router.delete('/:id', verifyTokenAdmin , (req, res) => {

    deleteAdmin(req, res);// El response se maneja dentro de la funcion
})


/**
 * @description Endpoint para buscar un admin por id
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @function verfiyTokenAdmin - Verifica que el token sea valido
 * @function updateArgsV - Valida los argumentos que se reciben
 * @function updateAdmin - Actualiza un admin en la base de datos
 */
router.put('/:id', verifyTokenAdmin, (req, res) => {
    const err = updateArgsV(req, res);// Valida los argumentos
    if (!err.flagErr) {
        updateAdmin(req, res);// El response se maneja dentro de la funcion
    }
})

/**
 * @description Endpoint para buscar un admin por parametro
 * de busqueda
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @function verfiyTokenAdmin - Verifica que el token sea tipo admin
 */
router.get('/search/:search', verifyTokenAdmin, (req, res) => {
    searchAdmin(req, res);// El response se maneja dentro de la funcion
})


module.exports = router;// exportamos el modulo