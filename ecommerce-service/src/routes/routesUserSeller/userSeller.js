const { checkUserExistance } = require('../globalQueries/checkUserExistance');
const { createArgumentsV } = require('../globalValidations/createArgsValidation');
const { createSellerUser } = require('./queries/createSellerUser');

const router = require('express').Router();


// Crear Usuario
router.post('/', async (req, res) => {
    
    const err = createArgumentsV(req, res);// Valida los argumentos
    if (!err.flagErr) {
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