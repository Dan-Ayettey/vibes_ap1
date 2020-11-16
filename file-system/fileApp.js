//dependencies
const express = require('express');
const logger = require('morgan');
const fileRouter = require('./routes/routes');
const cors=require('cors');
const queue=require('express-queue');
const fileApp = express();


//use middle-ware
fileApp.use(cors({origin:true}));
//fileApp.use('/',errorHandler)
// activeLimit - max request to process simultaneously
// queuedLimit - max requests in queue until reject (-1 means do not reject)
fileApp.use(queue({activeLimit:2,queuedLimit:-1}));
fileApp.use(logger('dev'));
const {error404Handler,error500Handler} = require("./errorHandler");
fileApp.use(express.json());
fileApp.use(express.urlencoded({ extended: true }));
//cache controller
fileApp.use((request,response,next)=>{
    response.setHeader('Cache-Control','public,max-age=600, s-max-age=800');
    next();
});

fileApp.use('/',fileRouter);
fileApp.use(error404Handler);
fileApp.use(error500Handler);
module.exports = fileApp;