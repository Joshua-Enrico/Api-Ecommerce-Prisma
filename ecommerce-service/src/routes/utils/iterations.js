const { validateEmail } = require("./emailValidation");

const validateByDict = (res, dict, validArgs, flagErr, errMessages) => {

    for (const key in dict) {
        if (!validArgs.includes(key)) {
            flagErr = true;
            res.status(400).send({
                error: `<${key}> ` + errMessages.invalidArg,
            });
        } else if (key !== "active") {
            if (dict[key] === "" || typeof dict[key] !== "string"){
                flagErr = true;
                res.status(400).send({
                    error:  `<${key}> ` + errMessages.wrongValue,
                });
            }
        } else if (key === "email" && !validateEmail(dict[key])) {
            flagErr = true;
            res.status(400).send({
                error: `<${key}> ` + errMessages.wrongEmail,
            });
        }
    }
    return flagErr;
}

module.exports = { validateByDict };