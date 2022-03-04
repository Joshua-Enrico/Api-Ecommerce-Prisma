/*  Buscando mantener la integridad de los endpoints , 
    las validaciones que estoy aplicando se aseguraran de lo siguiente
    que solo se manden los argumentos permitidos, que los argumentos 
    sean el typeof permitidos , no nulos y no vacios, en caso de email
    nos verificamos que sea un email valido */

const { validateByDict } = require("../utils/iterations");
const { errMessages } = require("../utils/messages");

function createArgumentsV(req, res) {
    const args = req.body; // Obtenemos los argumentos del body
    const validArgs = ["name", "email", "password"]; // lista de argumentos permitidos
    const dict = JSON.parse(JSON.stringify(args)); // Convertimos el objeto en un diccionario
    const argsQty = Object.keys(dict).length; // Cantidad de argumentos
    let flagErr = false; // Flag para saber si hay error

    if (argsQty === 0) {
        flagErr = true;
        res.status(400).send({
            error: errMessages.noArgs,
        });
    } else if (argsQty !== 3) {
        flagErr = true;
        res.status(400).send({
            error: errMessages.wrongArgs,
        });

        // validamos que los argumentos sean los permitidos y no sean vacios o de otro typeof
    } else {

        flagErr = validateByDict(res, dict, validArgs, flagErr, errMessages);
    }
    return {
        flagErr,
    };
}

module.exports = { createArgumentsV };
