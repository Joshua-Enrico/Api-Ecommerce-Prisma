const jwt = require('jsonwebtoken');


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
