/**
 * @module       app
 * @file         routes.js
 * @description  app module contains api methods
 * @author       Mohit Shah <mohitshah7777@gmail.com>
 * @since        01/07/2021  
-----------------------------------------------------------------------------------------------*/
const user = require('../controllers/user');
const contact = require('../controllers/contact');
const helper = require('../middleware/helper')

module.exports = (app) => {
    
    //api for registration
    app.post('/register', user.add);

    //api for login
    app.post('/login', user.login);

    //api for contact
    app.post('/create', helper.tokenChecker ,contact.add);

    //api for read
    app.get('/read',helper.tokenChecker ,contact.read);

    //api for read by id
    app.get('/read/:_id', helper.tokenChecker,contact.readOne);  
    
    //api for update by id
    app.put('/update/:_id', helper.tokenChecker,contact.update);
    
    //api for delete by id
    app.delete('/delete/:_id', helper.tokenChecker ,contact.delete);
}