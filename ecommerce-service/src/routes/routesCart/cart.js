const { dinamycVal } = require('../globalValidations/dinamycArgsValidation');
const { errCartMsg } = require('../utils/messages');
const { createCart } = require('./queries/createCart');
const { getAllCarts } = require('./queries/getAllCarts');
const { checkExistanceUS } = require('./validations/CheckExistance');

const router = require('express').Router();


/**
 * @description Endpoint para crear un carrito
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @const {list} validArgs - Lista de argumentos validos
 * @const {bolean} flexibleMode - Flag para especificar modo de validacion
 * @const {string} type - Tipo de validacion
 * @const {bolean} err - Flag para indicar si hay error
 */
router.post('/', async  (req, res) => {
    const validArgs = [ "usrSellerID", "sellerId", "products", "total" ];
    const flexibleMode = false;
    const type = "cart";

    const err = dinamycVal(req.body, res, validArgs, 4, errCartMsg, flexibleMode, type);// Valida los argumentos
    
    if(!err){
        const flag = await checkExistanceUS(req, res);
        console.log(flag);
        flag.isValid && createCart(req, res);
    }
})


/** 
 * @description Endpoint para obtener todos los carritos
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @function getAllCarts - Funcion para obtener todos los seller
 */
router.get('/all', (req, res) => {
    
    getAllCarts(req, res);
})


/**
 * @description Endpoint para eliminar un carrito
 * @param {*} req - Request object
 * @param {*} res - Response object
 */
router.delete('/:id', (req, res) => {

})


/**
 * @description Endpoint para actualizar un carrito
 * @param {*} req - Request object
 * @param {*} res - Response object
 */
router.put('/:id', (req, res) => {

})

/** 
 * @description Endpoint para buscar carritos por parametro
 * de busqueda
 * @param {*} req - Request object
 * @param {*} res - Response object
 */
router.get('/search/:search', (req, res) => {

    
})

module.exports = router;