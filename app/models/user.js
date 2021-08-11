/**
 * @module       AddressBook
 * @file         models.js
 * @description  addressBookSchema holds the database Schema 
 * @author       Mohit Shah <mohitshah7777@gmail.com>
 * @since        01/07/2021  
-----------------------------------------------------------------------------------------------*/
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const addressBookSchema = mongoose.Schema({
    firstName: {
        type: String,
        required : true ,
        validate: /^[a-zA-Z]{2,20}/     
    },
    lastName: {
        type: String,
        required : true,
        validate: /^[a-zA-Z]{2,20}/      
    },
    email: {
        type: String,
        required: true,
        validate: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

addressBookSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10)
        this.confirmPassword = await bcrypt.hash(this.confirmPassword, 10)
    }
    next();
})

const AddressBook = mongoose.model('AddressBook', addressBookSchema)

class AddressBookModel {
    /**
     * @description add person in the database
     * @param contact 
     * @param callback 
     */
    createDetails = (contact, callback) => {
        const addressBookSchema = new AddressBook({
            firstName: contact.firstName,
            lastName: contact.lastName,
            email: contact.email,
            password: contact.password,
            confirmPassword: contact.confirmPassword
        });
        addressBookSchema.save(callback)
    };

    /**
     * @description login user from the database
     * @param loginData 
     * @param callback for service
     */
    loginDetails = (loginData, callBack) => {
        AddressBook.findOne({'email': loginData.email},(error, data) => {
            if(error){
                return callBack(error, null);
            }else if(!data){
                return callBack("Invalid Credentials", null);
            }
            return callBack(null, data);
        })
    }

    // /**
    //  * @description find all users from the database
    //  * @param findAll 
    //  * @param callback for service
    //  */
    // findAll = (callBack) => {
    //     AddressBook.find({}, (error, data) => {
    //         if(error){
    //             return callBack(error, null)
    //         }else{
    //             return callBack(null, data)
    //         }
    //     })
    // } 

    // /**
    //  * @description find user by id from the database
    //  * @param findOne
    //  * @param callback for service
    //  */
    // findOne = (contact, callBack) => {
    //     AddressBook.findById({'_id': contact._id}, (error, data) => {
    //         if(error){
    //             return callBack(error, null)
    //         }else {
    //              return callBack(null, data)
    //         }
    //     })
    // }

    // /**
    //  * @description find user by id and update in the database
    //  * @param updateById
    //  * @param callback for service
    // */
    // updateById = (_id, contact, callBack) => {
    //     AddressBook.findByIdAndUpdate({'_id': contact._id}, {
    //         fullName: contact.fullName,
    //         address: contact.address,
    //         city: contact.city,
    //         state: contact.state,
    //         phone: contact.phone,
    //         email: contact.email,
    //         zip: contact.zip,
    //         password: contact.password
    //     }, (error, data) => {
    //         if(error){
    //             return callBack(error, null)
    //         }else {
    //             return callBack(null, data)
    //         }
    //     })
    // }

    // /**
    //  * @description find user by id and delete in the database
    //  * @param deleteById
    //  * @param callback for service
    //  */
    // deleteById = (contact, callBack) => {
    //     AddressBook.findByIdAndRemove(contact._id, (error, data) => {
    //         if(error){
    //             return callBack(error, null)
    //         }else{
    //             return callBack(null, data)
    //         }   
    //     })
    // }
}

module.exports = new AddressBookModel()