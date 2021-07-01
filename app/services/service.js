/**
 * @module       AddressBookService
 * @file         service.js
 * @description  AddressBookService class holds the callback method for controller 
 * @author       Mohit Shah <mohitshah7777@gmail.com>
 * @since        01/07/2021  
-----------------------------------------------------------------------------------------------*/
const model = require('../models/model')

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
}

module.exports = new AddressBookService()