const { dinamycVal } = require('../globalValidations/dinamycArgsValidation');
const { errWarehouseMsg } = require('../utils/messages');
const { createWarehouse } = require('./queries/createWarehouse');
const { getAllWarehs } = require('./queries/getAllWarehs');
const { getWhById } = require('./queries/getWById');
const { searchByArg } = require('./queries/seachByArg');
const { updateWarehouse } = require('./queries/updateWarehouse');
const { checkExistance } = require('./validations/checkExistance');
const { checkNeededExistance } = require('./validations/checkNeddedExistance');

const router = require('express').Router();


// Crea un warehouse
router.post('/', async (req, res) => {
    const validArgs = ["name", "address", "sellerId"]
    const err = dinamycVal(req.body, res, validArgs, 3, errWarehouseMsg, false);// Valida los argumentos
    console.log(err);
    if (!err) {
        const flag = await checkExistance(req.body, res);
        console.log(flag);
        flag.isValid && createWarehouse(req, res); // Si no existe el name y selle id , crea el warehouse
    }

})

// Lista de todos los warehouses
router.get('/all', (req, res) => {
    getAllWarehs(res);
})

// Warehouse por id
router.get('/:id', (req, res) => {
    getWhById(req, res);
})

// Elimina un warehouse por id
router.delete('/:id', (req, res) => {})

//Actualiza un warehouse por id
router.put('/:id', async (req, res) => {

    const validArgs = ["name", "address", "sellerId"]
    const err = dinamycVal(req.body, res, validArgs, 3, errWarehouseMsg, true);// Valida los argumentos
    console.log(err);
    if (!err) {
        const flag = await checkNeededExistance(req, res);
        console.log(flag);
        flag.isValid && updateWarehouse(req, res); // Si no existe el name y selle id , crea el warehouse
    }

    
})

// Busca un warehouse por ocurrencia
router.get('/search/:search', (req, res) => {

    searchByArg(req, res);
})


module.exports = router;