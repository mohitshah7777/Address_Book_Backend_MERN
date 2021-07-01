/**
 * @module       app
 * @file         routes.js
 * @description  app module contains api methods
 * @author       Mohit Shah <mohitshah7777@gmail.com>
 * @since        01/07/2021  
-----------------------------------------------------------------------------------------------*/
const controller = require('../controllers/controller');
const helper = require('../middleware/helper')

module.exports = (app) => {
    
    //api for registration
    app.post('/add', controller.add);

    //api for login
    app.post('/login', controller.login);

    //api for read
    app.get('/read',helper.tokenChecker ,controller.read);

    //api for read by id
    app.get('/read/:_id', helper.tokenChecker,controller.readOne);  
    
    //api for update by id
    app.put('/update/:_id', helper.tokenChecker,controller.update);
    
    //api for delete by id
    app.delete('/delete/:_id', helper.tokenChecker ,controller.delete);
}