const jwt = require('jsonwebtoken');

/**
 * @example
 * // return http response if token is not valid
 * @param {*} req express request object
 * @param {*} res express response object
 * @param {*} next next function
 * @description verify token and set authData to req object
 */
const verifyToken = (req, res, next) => {

    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWTSALT, (err, authData) => {
            if(err){
                res.status(401).json({
                    message: "Token invalid",
                    code: "token-invalid"
                });
            } else {
                req.authData = authData;
                next();
            }
        });
    } else {
        res.status(401).json({
            message: "No token provided",
            code: "no-token",
        });

    }

}

/**
 * @example
 * return http response if token is not valid 
 * or user is not admin
 * @param {*} req express request object
 * @param {*} res express response object
 * @param {*} next next function
 * @description verify token, return http response if 
 * token is not valid, continue if user is admin
 */
const verifyTokenAdmin = (req, res, next) => {

    verifyToken(req, res, () => {

        if(req.authData.userType === "admin"){
            next();
        } else {
            res.status(401).json({
                message: "User not authorized",
                code: "user-not-authorized",
            })
        }

    });

}


/**
 * 
 * @param {*} req express request object
 * @param {*} res express response object
 * @param {*} next next function
 * @description verify token, return http response if
 * token is not valid, continue if user is seller or admin
 */
const verifyTokenSeller = (req, res, next) => {

        verifyToken(req, res, () => {
            if(req.authData.userType === "seller" || req.authData.userType === "admin"){
                next();
            } else {
                res.status(401).json({
                    message: "User not authorized",
                    code: "user-not-authorized",
                })
            }
    
        });
}

/**
 * 
 * @param {*} req express request object
 * @param {*} res express response object
 * @param {*} next next function
 * @description verify token, return http response if
 * token is not valid, continue if user is buyer or admin
 */
const verifyTokenUser = (req, res, next) => {

    verifyToken(req, res, () => {

        if(req.authData.userType === "user" || req.authData.userType === "admin"){
            next();
        } else {
            res.status(401).json({
                message: "User not authorized",
                code: "user-not-authorized",
            })
        }

    });


}

module.exports = {verifyToken, verifyTokenAdmin, verifyTokenSeller, verifyTokenUser};
