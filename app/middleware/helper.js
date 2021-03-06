/**
 * @module       Helper
 * @file         helper.js
 * @description  Helper class holds the jwt token data 
 * @author       Mohit Shah <mohitshah7777@gmail.com>
 * @since        01/07/2021  
-----------------------------------------------------------------------------------------------*/
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

class Helper{

    /**
     * @description function to create a token for authentication of user
     * @param {*} loginData
     * @returns 
     */
    createToken = (loginData) => {
        return jwt.sign(loginData, process.env.SECRET_TOKEN, {
            expiresIn: "3000000s"
        })
    }

    /**
     * @description function compares with user password and bcrypted password stored in database
     * @param {*} loginPassword 
     * @param {*} databasePassword
     * @returns 
     */
    bcryptAuthentication = (loginPassword, databasePassword) => {
        let result = bcrypt.compareSync(loginPassword, databasePassword)
        return (loginPassword && databasePassword) ? result : false;
    }
    
    /**
     * @description function checks and validates the user token and authorises only if token is correct
     * @param {*} req
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    tokenChecker(req, res, next) {
        let token = req.get('token');
        try{
            if(token){
                jwt.verify(token, process.env.SECRET_TOKEN, error => {
                    if(error){
                        return res.status(400).send({success: false, message: "Invalid Token"});
                    }else{
                        next();
                    }
                })
            }else{
                return res.status(401).send({success: false, message: "Authorisation failed! Invalid user"});
            }
        }catch(error){
            return res.status(500).send({success: false, message: "Something went wrong!"});
        }
    }
}

module.exports = new Helper();