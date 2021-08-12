/**
 * @module       Contact
 * @file         models.js
 * @description  contactSchema holds the database Schema 
 * @author       Mohit Shah <mohitshah7777@gmail.com>
 * @since        01/07/2021  
-----------------------------------------------------------------------------------------------*/
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { error } = require('winston');

const contactSchema = mongoose.Schema({
    fullName: {
        type: String,
        required : true ,
        validate: /^[A-Z_]{1}[a-zA-Z_ ]{2,}$/     
    },
    address: {
        type: String,
        required : true,
        validate: /^[a-zA-Z]{2,20}/      
    },
    city: {
        type: String,
        required : true,
        validate: /^[a-zA-Z]{2,20}/      
    },
    state: {
        type: String,
        required : true,
        validate: /^[a-zA-Z]{2,20}/      
    },
    phone: {
        type: String,
        required : true,
        validate: /^[0-9]{1,10}/      
    },
    email: {
        type: String,
        required: true,
        validate: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        unique: true
    },
    zip: {
        type: String,
        required : true,
        validate: /^[0-9]{1,6}/      
    },
    __v: {
        versionKey: false
    }
},{
    timestamps: true
})

const Contact = mongoose.model('Contact', contactSchema)

class ContactModel {
    /**
     * @description add person in the database
     * @param contact 
     * @param callback 
     */
    createContact = (contact, callback) => {
        const contactSchema = new Contact({
            fullName: contact.fullName,
            address: contact.address,
            city: contact.city,
            state: contact.state,
            phone: contact.phone,
            email: contact.email,
            zip: contact.zip
        });
        contactSchema.save(callback)
    };

   
    /**
     * @description find all users from the database using promises
     * @param findAll 
     * @param 
     */
    findAll = () => {
        try{
            return Contact.find()
            .then((data) => {
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
     * @description find user by id from the database
     * @param findOne
     * @param callback for service
     */
    findOne = (contact, callBack) => {
        Contact.findById({'_id': contact._id}, (error, data) => {
            if(error){
                return callBack(error, null)
            }else {
                 return callBack(null, data)
            }
        })
    }

    /**
     * @description find user by id and update in the database
     * @param updateById
     * @param callback for service
    */
    updateById = (_id, contact, callBack) => {
        Contact.findByIdAndUpdate({'_id': contact._id}, {
            fullName: contact.fullName,
            address: contact.address,
            city: contact.city,
            state: contact.state,
            phone: contact.phone,
            email: contact.email,
            zip: contact.zip
        },{new: true},(error, data) => {
            if(error){
                return callBack(error, null)
            }else {
                return callBack(null, data)
            }
        })
    }

    /**
     * @description find user by id and delete in the database
     * @param deleteById
     * @param callback for service
     */
    deleteById = (contact, callBack) => {
        Contact.findByIdAndRemove(contact._id, (error, data) => {
            if(error){
                return callBack(error, null)
            }else{
                return callBack(null, data)
            }   
        })
    }
}

module.exports = new ContactModel()