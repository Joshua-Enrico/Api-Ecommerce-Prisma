const { validateEmail } = require("./emailValidation");

const validateByDict = (res, dict, validArgs, flagErr, errMessages) => {
    for (const key in dict) {
        if (!validArgs.includes(key)) {
            flagErr = true;
            res.status(400).send({
                error: `<${key}> ` + errMessages.invalidArg,
            });
            break;
        } else if (key !== "active") {
            if (dict[key] === "" || typeof dict[key] !== "string"){
                flagErr = true;
                res.status(400).send({
                    error:  `<${key}> ` + errMessages.wrongValue,
                });
                break;
            }
        } else if (key === "email" && !validateEmail(dict[key])) {
            flagErr = true;
            res.status(400).send({
                error: `<${key}> ` + errMessages.wrongEmail,
            });
            break;
        }
    }
    return flagErr;
}

function errResponse(res, message, code, arg){
    res.status(400).send({
        error: arg + " " + message,
        code: code
    })
}

const validateByDictProduct = (res, dict, validArgs, flagErr, errMessages) => {

    for (const key in dict) {
        if (!validArgs.includes(key)) {
            flagErr = true;
            errResponse(res, errMessages.invalidArg, "invalid-arg", key);
            break;

        } else if (key !== "active" && key !== "stock" && key !== "price") {
            if (dict[key] === "" || typeof dict[key] !== "string"){
                flagErr = true;
                errResponse(res, errMessages.wrongValue, "wrong-value", key);
                break;
            }
        } else if (key === "price" && typeof dict[key] !== "number") {
            flagErr = true;
            errResponse(res, errMessages.wrongValue, "wrong-value", key);
            break;
        }
    }
    return flagErr;
}

const validateByDictCart = (res, dict, validArgs, flagErr, errMessages) => {
    console.log("products");
    for (const key in dict) {
        if (!validArgs.includes(key)) {
            flagErr = true;
            errResponse(res, errMessages.invalidArg, "invalid-arg", key);
            break;

        } else if (key !== "active" && key !== "total" && key !== "products") {
            if (dict[key] === "" || typeof dict[key] !== "string"){
                flagErr = true;
                errResponse(res, errMessages.wrongValue, "wrong-value", key);
                break;
            }
        } else if (key === "products" && typeof dict[key] !== "object") {
            flagErr = true;
            errResponse(res, errMessages.wrongValue, "wrong-value", key);
            break;
        } else if (key === "total" && typeof dict[key] !== "number") {
            flagErr = true;
            errResponse(res, errMessages.wrongValue, "wrong-value", key);
            break;
        }
    }
    return flagErr;
}



module.exports = { validateByDict, validateByDictProduct, validateByDictCart };