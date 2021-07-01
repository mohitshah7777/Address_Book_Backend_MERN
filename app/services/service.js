/**
 * @module       AddressBookService
 * @file         service.js
 * @description  AddressBookService class holds the callback method for controller 
 * @author       Mohit Shah <mohitshah7777@gmail.com>
 * @since        01/07/2021  
-----------------------------------------------------------------------------------------------*/
const model = require('../models/model')
const helper = require('../middleware/helper')

class AddressBookService {
    /**
     * @description Create and save person then send response to controller
     * @method addDetails to save the contact
     * @param callback callback for controller
     */
    addDetails = (contact, callback) => {
        model.addDetails(contact, (error, data) => {
            return error ? callback(error, null) : callback(null, data)
        })
    }

        /**
     * @description sends the info to loginApi in the controller
     * @method loginDetails
     * @param callback callback for controller
    */
    loginDetails = (loginData, callback) => {
        model.loginDetails(loginData, (error, data) => {
            if(error){
                return callback(error, null)
            }if(helper.bcryptAuthentication(loginData.password, data.password)){
                const token = helper.createToken({loginData})
                return (token) ? callback(null, token) : callback(error, null)
            }
            return callback("Incorrect Password", error)    
        })
    }
}

module.exports = new AddressBookService()