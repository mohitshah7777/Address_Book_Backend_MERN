/**
 * @module       ContactService
 * @file         service.js
 * @description  ContactService class holds the callback method for controller 
 * @author       Mohit Shah <mohitshah7777@gmail.com>
 * @since        01/07/2021  
-----------------------------------------------------------------------------------------------*/
const { data } = require('../../logger/logger')
const model = require('../models/contact')

class ContactService {
    /**
     * @description Create and save person then send response to controller
     * @method addDetails to save the contact
     * @param callback callback for controller
     */
    createContact = (contact, callback) => {
        model.createContact(contact, (error, data) => {
            return error ? callback(error, null) : callback(null, data)
        })
    }

    /**
     * @description sends the info to read in the controller using promises
     * @method getAllDetails
     * @param 
    */
    getAllDetails = () => {
        try{
            return model.findAll().then((data) => {
                if(data){
                    return data
                }else{
                    return null
                }
            }).catch((error) => {
                return error
            })
        }catch(error){  
            return error
        }
    }

    /**
     * @description sends the info to readOne in the controller
     * @method getDetailsById
     * @param contact
    */
    getDetailsById = async (contactId) => {
        try{
            const data = await model.findOne(contactId);
            return data;
        }catch(error){
            return data;
        }
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