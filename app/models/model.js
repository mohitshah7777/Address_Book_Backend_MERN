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
    password: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

addressBookSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10)
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
    addDetails = (contact, callback) => {
        const addressBookSchema = new AddressBook({
            fullName: contact.fullName,
            address: contact.address,
            city: contact.city,
            state: contact.state,
            phone: contact.phone,
            email: contact.email,
            zip: contact.zip,
            password: contact.password
        });
        addressBookSchema.save(callback)
    };
}

module.exports = new AddressBookModel()