/**
 * @module       AddressBookController
 * @file         controller.js
 * @description  AddressBookController class holds the Api methods for routing 
 * @author       Mohit Shah <mohitshah7777@gmail.com>
 * @since        1/07/2021  
-----------------------------------------------------------------------------------------------*/
const service = require('../services/user');
const validateSchema = require('../middleware/userValidation')

class AddressBookController{
    /**
     * @description Create and save person details and sending response to service
     * @method add to save the contact
     * @param req,res for service
     */
    add = (req, res) => {
        // Validate request
        const validation = validateSchema.validate(req.body)
        if(validation.error){
            res.status(400).send({message: validation.error.details[0].message})
        }

        // Create an contact
        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword
        }

        const addData ={}
        
        service.createDetails(contact, (error,data) => {
            if(error){
                return res.status(400)
                .send({success:false, message: "Email already exists", data: null})
            }
            else{
                return res.status(200)
                .send({success: true, message: "Person details has been registered successfully", data: addData.data = data})
            }
        })
    }

    /**
     * @description retrieving login info from user by email and password
     * @method login
     * @param req,res for service
     */
    login = (req, res) => {
        const loginData = {
            email: req.body.email,
            password : req.body.password
        }
        service.loginDetails(loginData, (error, token) => {
            if(error){
                return res.status(400).send({success: false, message: error, token: null})
            }
            else{
                return res.status(200).send({success: true, message: "Successfully Logged In", token: token})
            }
        })
    }

    // /**
    // * @description retrieving all user data
    // * @method read
    // * @param req,res for service
    // */
    // read = (req, res) => {
    //     service.getAllDetails((error, data) => {
    //         if(error){
    //             return res.status(400).send({success: false, message : "Error while fetching information", data: null})
    //         }else{
    //             return res.status(200).send({success: true, message: "All contact details fetched", data: data})
    //         }
    //     })
    // }

    // /**
    //  * @description retrieving user data by Id
    //  * @method readOne
    //  * @param req,res for service
    // */
    // readOne = (req, res) => {
    //     var contactId = req.params
    //     service.getDetailsById(contactId,(error, data) => {
    //         if(error || data == null){
    //             return res.status(404).send({success: false, message: "Error! Not Found", data: null})
    //         }else{
    //             return res.status(200).send({success: true, message: "Particular person contact details fetched", data: data})
    //         }
    //     })
    // }

    // /**
    //  * @description updating user data using Id
    //  * @method update
    //  * @param req,res for service
    // */
    // update = (req, res) => {
    //     const validation = validateSchema.validate(req.body)
    //     if(validation.error){
    //         res.status(400).send({message: validation.error.details[0].message})
    //     }   
    
    //     const contact = {
    //         _id: req.params._id,
    //         fullName: req.body.fullName,
    //         address: req.body.address,
    //         city: req.body.city,
    //         state: req.body.state,
    //         phone: req.body.phone,
    //         email: req.body.email,
    //         zip: req.body.zip,
    //         password: req.body.password
    //     } 

    //     var contactId = req.params

    //     service.updateDetailsById(contactId, contact,(error, data) => {
    //         if(error){
    //             return res.status(404).send({success: false, message: "Error! Not Found", data: null})
    //         }else{
    //             return res.status(200).send({success: true, message: "Contact details updated successfully", data: data})
    //         }
    //     })
    // }

    // /**
    //  * @description deleting user data using Id
    //  * @method delete
    //  * @param req,res for service
    // */
    // delete = (req, res) => {
    //     var contact = req.params
    //     service.deleteDetailsById(contact, (error, data) => {
    //         if(error || data == null){
    //             return res.status(404).send({success: false, message: "Contact not found", data: null})
    //         }else{
    //             return res.status(200).send({success: true, message: "Contact details deleted successfully!", data: data})
    //         }
    //     })
    // }
}

module.exports = new AddressBookController()