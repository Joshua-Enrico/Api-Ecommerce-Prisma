const { dinamycVal } = require('../globalValidations/dinamycArgsValidation');
const { errCartMsg } = require('../utils/messages');
const { createCart } = require('./queries/createCart');
const { getAllCarts } = require('./queries/getAllCarts');
const { checkExistanceUS } = require('./validations/CheckExistance');

const router = require('express').Router();


//Crea un cart
router.post('/seller', async  (req, res) => {
    const validArgs = [ "usrSellerID", "sellerId", "products", "total" ];
    const flexibleMode = false;
    const mode = "cart";

    const err = dinamycVal(req.body, res, validArgs, 4, errCartMsg, flexibleMode, mode);// Valida los argumentos
    
    if(!err){
        const flag = await checkExistanceUS(req, res);
        console.log(flag);
        flag.isValid && createCart(req, res);
    }
})

//Lista de todos los carts
router.get('/all', (req, res) => {
    
    getAllCarts(req, res);
})

// Elimina un cart por id
router.delete('/:id', (req, res) => {

})

//Actualiza un cart por id
router.put('/:id', (req, res) => {

})

// Busca un cart por ocurrencia
router.get('/search/:search', (req, res) => {

    
})

module.exports = router;