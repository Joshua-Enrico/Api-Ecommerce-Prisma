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

/*  Crea un nuevo admin, esta ruta esta protegida
    por el middleware de autenticacion
*/
router.post('/',verifyTokenAdmin, async (req, res) => {

    const validArgs = ["name", "email", "password"];
    const err = dinamycVal(req.body, res, validArgs, 3, errMessages, false );// Valida los argumentos
    if (!err) {
        const flag = await checkUserExistance(req.body, res);// Verifica que el name y email no existan
        flag.isValid && createUser(req.body, res); // Si no existe el name y email, crea el admin
    }

})

/* Lista de todos los usuarios */
router.get('/all',verifyTokenAdmin, (req, res) => {

    getAllAdmins(res);// Esta funcion maneja el query y response
})

/* Elimina un usuario admin por id */
router.delete('/:id', verifyTokenAdmin , (req, res) => {

    deleteAdmin(req, res);// El response se maneja dentro de la funcion
})

// Actualiza un usuario admin por id
router.put('/:id', verifyTokenAdmin, (req, res) => {
    const err = updateArgsV(req, res);// Valida los argumentos
    if (!err.flagErr) {
        updateAdmin(req, res);// El response se maneja dentro de la funcion
    }
})

/* Busca un usuario por ocurrencia de nombre, email */
router.get('/search/:search', verifyTokenAdmin, (req, res) => {
    searchAdmin(req, res);// El response se maneja dentro de la funcion
})


module.exports = router;// exportamos el modulo