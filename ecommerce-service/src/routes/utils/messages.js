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

module.exports = { errMessages, errUpdateMsg, errSellerMsg };