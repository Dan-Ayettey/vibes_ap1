
const express = require('express');
const fileUpload=require('express-fileupload');
const {withJWTAuthMiddleware} = require('express-kun');
const {apiVer}=require('../controllers/versionController');
const {grantAccess,allowIfLoggedIn}=require('../../configurations/auth/grantAccess.js');
const {veryToken}=require('../../controllers/userController.js');
const {writeFileController,createStat,deleteFileByUserId}=require('../controllers/fsmController');
const  {createFileSchema,
    getFilesSchema,
    validationResult,
    updateFileSchema,
    getFileProductsByUserIdSchema,
    getFileByUserIdSchema,
    getFileByIdSchema}=require('../configurations/fileSchema/fsmSchema.js');

const router=express.Router();
router.use(veryToken);
router.use(fileUpload({
    createParentPath:true
}));
const protectedRoute = withJWTAuthMiddleware(router,process.env.JWT_SECRET);

router.all('/',apiVer);
router.post('/v1/files/user/id',createFileSchema,writeFileController);
router.post('/v1/files/stat/user/id',createFileSchema,allowIfLoggedIn,createStat);
protectedRoute.delete('/v1/files/id',createFileSchema,allowIfLoggedIn,deleteFileByUserId);
module.exports=router;