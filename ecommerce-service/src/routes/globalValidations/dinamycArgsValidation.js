const { validateByDict, validateByDictProduct, validateByDictCart } = require("../utils/iterations");


/**
 * 
 * @param {*} data 
 * @param {*} res express response object
 * @param {*} validArgs list of valid arguments
 * @param {*} validQTY Quantity of valid arguments
 * @param {*} errMsgs dictionary of error messages
 * @param {*} flag to specify if flexible validation
 * @param {*} validationType model type validation
 * @returns flag
 */
function dinamycVal(data, res, validArgs, validQTY, errMsgs, flag, validationType){
    const dict = JSON.parse(JSON.stringify(data));
    const argsQty = Object.keys(dict).length;
    let flagErr = false;

    if (argsQty === 0) {
        flagErr = true;
        res.status(400).send({
            error: errMsgs.noArgs,
        });
    } else if ((flag && argsQty > validQTY) || (!flag && argsQty !== validQTY)) {
        flagErr = true;
        res.status(400).send({
            error: errMsgs.wrongArgs,
        });

    // validamos que los argumentos sean los permitidos y no sean vacios o de otro typeof
    } else {
            (validationType === "product") && 
            (flagErr = validateByDictProduct(res, dict, validArgs, flagErr, errMsgs))
        
            validationType === "cart" ?
            flagErr = validateByDictCart(res, dict, validArgs, flagErr, errMsgs) :
            flagErr = validateByDict(res, dict, validArgs, flagErr, errMsgs);
            return flagErr;
    }

}

module.exports = { dinamycVal };