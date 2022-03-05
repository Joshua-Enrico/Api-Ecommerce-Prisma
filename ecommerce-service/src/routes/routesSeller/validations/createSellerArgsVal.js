const { dinamycVal } = require("../../globalValidations/dinamycArgsValidation");
const { errMessages, errSellerMsg } = require("../../utils/messages");

function createSellerV(data, res){
    const { seller, selleruser } = data;
    let flagErr = '';// esta variable nos permite esperar a que se evalue todo el codigo
    flagErr = dinamycVal(seller, res, [ "name", "description", "address"], 3, errSellerMsg);
    (!flagErr) && (flagErr = dinamycVal(selleruser, res, [ "name", "email", "password"], 3, errMessages));

    return flagErr;

}


module.exports = { createSellerV };