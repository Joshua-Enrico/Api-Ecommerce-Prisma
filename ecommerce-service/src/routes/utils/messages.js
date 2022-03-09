const errMessages = {
    noArgs: 'No arguments were sent',
    wrongArgs: 'Only three arguments permited : name, email, password are allowed',
    invalidArg: 'is not a valid argument valid, allowed arguments are : name, mail, password',
    wrongValue: 'value is empty or wrong type',
    wrongEmail: 'is not a valid email',
}

const errUpdateMsg = {
    noArgs: 'No arguments were sent',
    wrongArgs: 'Only two arguments permited : name, email',
    invalidArg: 'is not a valid argument valid, allowed arguments are : name, mail',
    wrongValue: 'value is empty or wrong type',
    wrongEmail: 'is not a valid email',
    wrongActiveType: 'active value is not a boolean',
}

const errSellerMsg = {
    noArgs: 'No arguments were sent',
    wrongArgs: 'Only three arguments permited : name, description, address',
    invalidArg: 'is not a valid argument valid, allowed arguments are : name, description, address',
    wrongValue: 'value is empty or wrong type',
    wrongEmail: 'is not a valid email',
    wrongActiveType: 'active value is not a boolean',
}

const errUsrSellerMsg = {
    noArgs: 'No arguments were sent',
    wrongArgs: 'Only four arguments permited : sellerId, name, email, password',
    invalidArg: 'is not a valid argument valid, allowed arguments are : sellerId, name, email, password',
    wrongValue: 'value is empty or wrong type',
    wrongEmail: 'is not a valid email',
    wrongActiveType: 'active value is not a boolean',
}

const errWarehouseMsg = {
    noArgs: 'No arguments were sent',
    wrongArgs: 'Only three arguments permited : name, address, sellerId',
    invalidArg: 'is not a valid argument valid, allowed arguments are : name, address, sellerId',
    wrongValue: 'value is empty or wrong type',
    wrongEmail: 'is not a valid email',
    wrongActiveType: 'active value is not a boolean',
}

const errUsrMsg = {
    noArgs: 'No arguments were sent',
    wrongArgs: 'Only four arguments permited : name, email, password, address',
    invalidArg: 'is not a valid argument valid, allowed arguments are : name, email, password, address',
    wrongValue: 'value is empty or wrong type',
    wrongEmail: 'is not a valid email',
    wrongActiveType: 'active value is not a boolean',
}

const errProductMsg = {
    noArgs: 'No arguments were sent',
    wrongArgs: 'Only four arguments permited : name, description, price, stock, warehouseId, sellerId',
    invalidArg: 'is not a valid argument valid, allowed arguments are : name, description, price, stock, warehouseId, sellerId',
    wrongValue: 'value is empty or wrong type',
    wrongEmail: 'is not a valid email',
    wrongActiveType: 'active value is not a boolean',
}

const errCartMsg = {
    noArgs: 'No arguments were sent',
    wrongArgs: 'Only four arguments permited : userId, sellerId, products, total',
    invalidArg: 'is not a valid argument valid, allowed arguments are : userId, sellerId, products, total',
    wrongValue: 'value is empty or wrong type',
    wrongEmail: 'is not a valid email',
    wrongActiveType: 'active value is not a boolean',
}

const errUpdateSellerMsg = {
    noArgs: 'No arguments were sent',
    wrongArgs: 'Only four arguments permited : name, description, address, userId',
    invalidArg: 'is not a valid argument valid, allowed arguments are : name, description, address, userId',
    wrongValue: 'value is empty or wrong type',
    wrongEmail: 'is not a valid email',
    wrongActiveType: 'active value is not a boolean',
}

module.exports = {  errMessages, errUpdateMsg, errSellerMsg,
                    errUsrSellerMsg, errWarehouseMsg, errUsrMsg,
                    errProductMsg, errCartMsg, errUpdateSellerMsg };