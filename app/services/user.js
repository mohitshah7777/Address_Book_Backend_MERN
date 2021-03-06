/**
 * @module       AddressBookService
 * @file         service.js
 * @description  AddressBookService class holds the callback method for controller 
 * @author       Mohit Shah <mohitshah7777@gmail.com>
 * @since        01/07/2021  
-----------------------------------------------------------------------------------------------*/
const model = require('../models/user')
const helper = require('../middleware/helper')

class AddressBookService {
    /**
     * @description Create and save person then send response to controller
     * @method addDetails to save the contact
     * @param callback callback for controller
     */
    createDetails = async (contact, callback) => {
        model.createDetails(contact, (error, data) => {
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

    // /**
    //  * @description sends the info to read in the controller
    //  * @method getAllDetails
    //  * @param callback callback for controller
    // */
    // getAllDetails = (callback) => {
    //     model.findAll((error, data) => {
    //         return (error) ? callback(error, null) : callback(null, data)
    //     })
    // }

    // /**
    //  * @description sends the info to readOne in the controller
    //  * @method getDetailsById
    //  * @param callback callback for controller
    // */
    // getDetailsById = (contact, callback) => {
    //     model.findOne(contact, (error, data) => {
    //         return (error) ? callback(error, null) : callback(null, data)
    //     })
    // }

    // /**
    //  * @description sends the info to update in the controller
    //  * @method updateDetailsById
    //  * @param callback callback for controller
    // */
    // updateDetailsById = (contactId, contact, callback) => {
    //     model.updateById(contactId, contact, (error, data) => {
    //         return (error) ? callback(error, null) : callback(null, data)
    //     })
    // }

    // /**
    //  * @description sends the info to delete in the controller
    //  * @method deleteDetailsById
    //  * @param callback callback for controller
    // */
    // deleteDetailsById = (contact, callback) => {
    //     model.deleteById(contact, (error, data) => {
    //         return (error) ? callback(error, null) : callback(null, data)
    //     })
    // }
}

module.exports = new AddressBookService()