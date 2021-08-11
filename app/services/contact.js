/**
 * @module       ContactService
 * @file         service.js
 * @description  ContactService class holds the callback method for controller 
 * @author       Mohit Shah <mohitshah7777@gmail.com>
 * @since        01/07/2021  
-----------------------------------------------------------------------------------------------*/
const model = require('../models/contact')
const helper = require('../middleware/helper')

class ContactService {
    /**
     * @description Create and save person then send response to controller
     * @method addDetails to save the contact
     * @param callback callback for controller
     */
    createContact = async (contact, callback) => {
        model.createContact(contact, (error, data) => {
            return error ? callback(error, null) : callback(null, data)
        })
    }

    /**
     * @description sends the info to read in the controller
     * @method getAllDetails
     * @param callback callback for controller
    */
    getAllDetails = (callback) => {
        model.findAll((error, data) => {
            return (error) ? callback(error, null) : callback(null, data)
        })
    }

    /**
     * @description sends the info to readOne in the controller
     * @method getDetailsById
     * @param callback callback for controller
    */
    getDetailsById = (contact, callback) => {
        model.findOne(contact, (error, data) => {
            return (error) ? callback(error, null) : callback(null, data)
        })
    }

    /**
     * @description sends the info to update in the controller
     * @method updateDetailsById
     * @param callback callback for controller
    */
    updateDetailsById = (contactId, contact, callback) => {
        model.updateById(contactId, contact, (error, data) => {
            return (error) ? callback(error, null) : callback(null, data)
        })
    }

    /**
     * @description sends the info to delete in the controller
     * @method deleteDetailsById
     * @param callback callback for controller
    */
    deleteDetailsById = (contact, callback) => {
        model.deleteById(contact, (error, data) => {
            return (error) ? callback(error, null) : callback(null, data)
        })
    }
}

module.exports = new ContactService()