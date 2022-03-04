const { checkExistance } = require('./queries/checkExistance');
const { createSellerAndUser } = require('./queries/creatSeller');
const { createSellerV } = require('./validations/createSellerArgsVal');

const router = require('express').Router();


/*  Para crear un Seller como requerimiento 
    se debee crear un usuario */
router.post('/', async (req, res) => {

    let result = createSellerV(req.body, res);
    !result && (result = await checkExistance(req.body, res));
    result.isValid && (await createSellerAndUser(req.body, res));

})


module.exports = router;