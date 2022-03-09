/*Este modulo contiene todos los endpoints de Seller */

// Importamos modulos necesarios
const { verifyTokenAdmin, verifyTokenSeller } = require('../../authMiddleware/accessVerification');
const { dinamycVal } = require('../globalValidations/dinamycArgsValidation');
const { errSellerMsg, errUpdateSellerMsg } = require('../utils/messages');
const { checkExistance } = require('./queries/checkExistance');
const { createSellerAndUser } = require('./queries/createSeller');
const { getAllSellers } = require('./queries/getAllSellers');
const { getSellerById } = require('./queries/getSellerById');
const { updateSeller } = require('./queries/updateSeller');
const { createSellerV } = require('./validations/createSellerArgsVal');
const { validateQueryAcess } = require('./validations/validateQueryAcess');

const router = require('express').Router();// Importamos express para poder crear rutas


/* descripcion: Crea un un seller y selleruser, se deben crear ambos como requerimiento
    * @param {object} req - Objeto request
    * @param {object} res - Objeto response
    * @function createSellerV - Funcion que valida lso argumentos del body
    * @function checkExistance - Funcion que comprueba si existe un seller con el mismo name o 
    * un selleruser con el mismo email o name
    * @function createSellerAndUser - Funcion que crea un nuevo usuario y un nuevo vendedor
*/
router.post('/', verifyTokenAdmin, async (req, res) => {

    let result = createSellerV(req.body, res);
    !result && (result = await checkExistance(req.body, res));
    result.isValid && (await createSellerAndUser(req.body, res));

})


/* descripcion: Obtiene todos los sellers
    * @param {object} req - Objeto request
    * @param {object} res - Objeto response
*/
router.get('/', verifyTokenSeller, (req, res) => {

    getAllSellers(res);
})

/* descripcion: Obtiene Seller por id 
    * @param {object} req - Objeto request
    * @param {object} res - Objeto response
*/
router.get('/:id', verifyTokenSeller, (req, res) => {

    getSellerById(req, res);

})

/* descripcion: Actualiza un seller
    * @param {object} req - Objeto request
    * @param {object} res - Objeto response
    * @function updateSeller - Funcion que actualiza un seller
    * @function dinamycVal - Funcion que valida los argumentos del body
*/
router.put('/:id', verifyTokenSeller, async (req, res) => {

    const valirArgs = [ "name", "description", "address", "userId"]
    let result = dinamycVal(req.body, res, valirArgs , 4, errUpdateSellerMsg, true);

    if (!result.isValid) {
        const flag = await validateQueryAcess(req, res);
        flag.isValid && updateSeller(req, res);
    }

})

// router.delete('/', (req, res) => {

// })


module.exports = router;