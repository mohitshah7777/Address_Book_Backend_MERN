const Joi = require('joi')

// joi validation
const validateSchema = Joi.object({
    fullName: Joi.string().min(2).max(25).pattern(new RegExp('^[A-Z_]{1}[a-zA-Z_ ]{2,}$')).required(),
    address: Joi.string().min(2).max(25).pattern(new RegExp('^[a-zA-Z]{2,}')).required(),
    city: Joi.string().min(2).max(20).pattern(new RegExp('^[a-zA-Z]{2,}')).required(),
    state: Joi.string().min(2).max(25).pattern(new RegExp('^[a-zA-Z]{2,}')).required(),
    phone: Joi.string().min(10).max(10).pattern(new RegExp('^[0-9]{2,}')).required(),
    email: Joi.string().email().pattern(new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")).required(),
    zip: Joi.string().min(2).max(15).pattern(new RegExp('^[0-9]{2,}')).required(),
    password: Joi.string().min(8).max(20).pattern(new RegExp("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$")).required()
    
}) 

module.exports = validateSchema;
