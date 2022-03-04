const { validateByDict } = require("../../utils/iterations");
const { errMessages, errSellerMsg } = require("../../utils/messages");

function createSellerV(data, res){
    const { seller, selleruser } = data;
    let flagErr = '';// esta variable nos permite esperar a que se evalue todo el codigo
    flagErr = dinamycVal(seller, res, [ "name", "description", "address"], 3, errSellerMsg);
    (!flagErr) && (flagErr = dinamycVal(selleruser, res, [ "name", "email", "password"], 3, errMessages));

    return flagErr;

}

// Valida argumentos dinamicamente
function dinamycVal(data, res, validArgs, validQTY, errMsgs){
    const dict = JSON.parse(JSON.stringify(data));
    const argsQty = Object.keys(dict).length;
    let flagErr = false;

    if (argsQty === 0) {
        flagErr = true;
        res.status(400).send({
            error: errMsgs.noArgs,
        });
    } else if (argsQty !== validQTY) {
        flagErr = true;
        res.status(400).send({
            error: errMsgs.wrongArgs,
        });

    // validamos que los argumentos sean los permitidos y no sean vacios o de otro typeof
    } else {
            
            flagErr = validateByDict(res, dict, validArgs, flagErr, errMsgs);
    }
    return flagErr;

}

module.exports = { createSellerV };