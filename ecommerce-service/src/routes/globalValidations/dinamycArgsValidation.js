const { validateByDict } = require("../utils/iterations");


// Valida argumentos dinamicamente
function dinamycVal(data, res, validArgs, validQTY, errMsgs, flag){
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
            
            flagErr = validateByDict(res, dict, validArgs, flagErr, errMsgs);
    }
    return flagErr;

}

module.exports = { dinamycVal };