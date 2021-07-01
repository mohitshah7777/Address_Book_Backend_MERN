/**
 * @file         database.config.js
 * @description  Connection details for database 
 * @author       Mohit Shah <mohitshah7777@gmail.com>
 * @since        01/07/2021  
-----------------------------------------------------------------------------------------------*/

const mongoose = require("mongoose");
require('dotenv').config()

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex: true,  useFindAndModify: false })
    .then(() => { console.log("Successfully connected to the database"); })
    .catch(err => { console.log('Could not connect to the database. Exiting now...', err);
                    process.exit();
    });