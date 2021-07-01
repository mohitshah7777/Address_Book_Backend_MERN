/**
 * @module       AddressBookController
 * @file         controller.js
 * @description  AddressBookController class holds the Api methods for routing 
 * @author       Mohit Shah <mohitshah7777@gmail.com>
 * @since        1/07/2021  
-----------------------------------------------------------------------------------------------*/
const service = require('../services/service');
const validateSchema = require('../middleware/validation')

class AddressBookController{
    /**
     * @description Create and save person details and sending response to service
     * @method add to save the employee
     * @param req,res for service
     */
    add = (req, res) => {
        // Validate request
        const validation = validateSchema.validate(req.body)
        if(validation.error){
            res.status(400).send({message: validation.error.details[0].message})
        }

        // Create an employee
        const contact = {
            fullName: req.body.fullName,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            phone: req.body.phone,
            email: req.body.email,
            zip: req.body.zip,
            password: req.body.password
        }

        const addData ={}
        
        service.addDetails(contact, (error,data) => {
            if(error){
                return res.status(400)
                .send({success:false, message: "Email already exists", data: null})
            }
            else{
                return res.status(200)
                .send({success: true, message: "Person details has been added successfully", data: addData.data = data})
            }
        })
    }
}

module.exports = new AddressBookController()