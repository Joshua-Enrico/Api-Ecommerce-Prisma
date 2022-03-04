const { validateByDict } = require("../../utils/iterations");
const { errUpdateMsg } = require("../../utils/messages");

function updateArgsV(req, res) {
    const args = req.body; // Obtenemos los argumentos del body
    const validArgs = ["name", "email", "active"]; // lista de argumentos permitidos
    const dict = JSON.parse(JSON.stringify(args)); // Convertimos el objeto en un diccionario
    const argsQty = Object.keys(dict).length; // Cantidad de argumentos
    let flagErr = false; // Flag para saber si hay error

    if (argsQty === 0) {
        flagErr = true;
        res.status(400).send({
            error: errUpdateMsg.noArgs,
        });
    } else if (argsQty > 3) {
        flagErr = true;
        res.status(400).send({
            error: errUpdateMsg.wrongArgs,
        });
    } else {
        flagErr = validateByDict(res, dict, validArgs, flagErr, errUpdateMsg);
        if(dict.active){
            if(dict.active !== true && dict.active !== false){
                flagErr = true;
                res.status(400).send({
                    error: errUpdateMsg.wrongActiveType,
                });
            }
        }
        
    }
    return {
        flagErr,
    };
}

module.exports = { updateArgsV };