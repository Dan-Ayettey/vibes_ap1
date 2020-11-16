/**
 * Created by ictte on 09/11/2020.
 */
const express = require('express');
const {partialWithJWTAuthMiddleware} = require('express-kun');
const {apiVer}=require('../controllers/versionController');
const {writeFileController}=require('../controllers/fsmController');

const router=express.Router();
const protectedRoute =partialWithJWTAuthMiddleware(router,process.env.JWT_SECRET);
router.all('/',apiVer);
router.post('/v1/files/users/id',writeFileController);
module.exports=router;