const { dinamycVal } = require('../globalValidations/dinamycArgsValidation');
const { errProductMsg } = require('../utils/messages');
const { createProduct } = require('./queries/createProduct');
const { getAllProducts } = require('./queries/getAllProducts');
const { getProductById } = require('./queries/getProdcutById');
const { searchProducts } = require('./queries/searchProducts');
const { updateProduct } = require('./queries/updateProduct');
const { checkExistanceSW, checkNeededExistance } = require('./validations/checkExistance');

const router = require('express').Router();// Importamos express para poder crear rutas

// Crea un producto
router.post('/', async (req, res) => {

    const validArgs = ["name", "description", "price", "stock", "warehouseId", "sellerId"];
    const validationType = "product"
    const flexibleMode = false
    const err = dinamycVal(req.body, res, validArgs, 6, errProductMsg, flexibleMode, validationType);// Valida los argumentos
    if(!err){
        const flag = await checkExistanceSW(req, res);
        flag.isValid && createProduct(req, res);
    }

})

// Obtener todos los productos
router.get('/all/', (req, res) => {

    getAllProducts(req, res);
})

// Obtiene producto por id
router.get('/:id', (req, res) => {
    getProductById(req, res);
})

// Update producto por id
router.put('/:id', async (req, res) => {
    const validArgs = ["name", "description", "price", "stock", "warehouseId", "sellerId"];
    const validationType = "product"
    const flexibleMode = true
    const err = dinamycVal(req.body, res, validArgs, 6, errProductMsg, flexibleMode, validationType);// Valida los argumentos

    if(!err){
        flag = await checkNeededExistance(req, res);
        console.log(flag);
        flag.isValid && updateProduct(req, res);
    }

})

// Busqueda de productos
router.get('/search/:search', (req, res) => {
    searchProducts(req, res);
})



module.exports = router;