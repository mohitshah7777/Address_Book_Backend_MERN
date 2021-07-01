/**
 * @module       app
 * @file         routes.js
 * @description  app module contains api methods
 * @author       Mohit Shah <mohitshah7777@gmail.com>
 * @since        01/07/2021  
-----------------------------------------------------------------------------------------------*/
const controller = require('../controllers/controller');

module.exports = (app) => {
    
    //api for registration
    app.post('/add', controller.add);

    //api for login
    app.post('/login', controller.login);

    //api for read
    app.get('/read',controller.read);
}