//dependencies
const express = require('express');
const {grantAccess,allowIfLoggedIn}=require('../configurations/auth/grantAccess');
const {createUser,getUserById,getUsers,authorizeUser, deactivateUserById, activateUser, updateUserById,deleteUserById,
    renewPasswordById,veryToken,renewSecretById,getCustomerById}= require("../controllers/userController");
const {apiVer } = require("../controllers/versionController");
const {deleteCartProductById,createCartProduct,getCartProducts,
    getCartProductById,updateCartProductById,getCartProductsByUserId}=require('../controllers/cartController');
const {getCartSchema,createCartSchema,updateCartSchema,getCartByIdSchema,getCartProductsByUserIdSchema}=require('../configurations/schema/cartSchema');
const {withJWTAuthMiddleware}=require('express-kun');
const {schemaUpdate,getCustomerByIdSchema,schemaRenewPassword,schemaCreate,schemaGet,schemaAuth,schemaActivate,schemaDelete,schemaRenewSecretMessage}
= require("../configurations/schema/userSchema");
const{createChat,deleteChatById,getChatById,getChats,getChatsByUserId,updateChatById}=require('../controllers/chatController');
const {createChatSchema,getChatByIdSchema,getChatByUserIdSchema,getChatProductsByUserIdSchema,getChatsSchema,updateChatSchema}=require('../configurations/schema/chatSchema');
const router = express.Router();
const protectedRouter=withJWTAuthMiddleware(router,process.env.JWT_SECRET);

/* RoutersBasic role */
router.get('/v1/',apiVer);
router.all('/',apiVer);
router.post('/v1/users',schemaCreate,createUser);
//router.post('/v1/payments',createStripeChargeIntent);
router.post('/v1/users/auth',schemaAuth,authorizeUser);
router.use(veryToken);

router.post('/v1/users/activated-accounts',schemaActivate,activateUser);
protectedRouter.get('/v1/users/:id',schemaGet,allowIfLoggedIn,getUserById);
protectedRouter.put('/v1/users/:id',schemaUpdate,allowIfLoggedIn,updateUserById);
protectedRouter.put('/v1/users/:id/renewed-secret',schemaRenewSecretMessage,allowIfLoggedIn,renewSecretById);
protectedRouter.put('/v1/users/:id/renewed-password',schemaRenewPassword,renewPasswordById);
protectedRouter.put('/v1/users/:id/deactivated-account',schemaUpdate,allowIfLoggedIn,deactivateUserById);

//cart routes
router.post('/v1/carts/users/:id',createCartSchema,createCartProduct);
protectedRouter.delete('/v1/carts/user-carted/:cid',getCartByIdSchema,allowIfLoggedIn,deleteCartProductById);
protectedRouter.get('/v1/carts/user-carted/:cid',getCartByIdSchema,allowIfLoggedIn,getCartProductById);
protectedRouter.put('/v1/carts/user-carted/:cid',updateCartSchema,allowIfLoggedIn,updateCartProductById);
protectedRouter.get('/v1/carts/users/:id',getCartProductsByUserIdSchema,allowIfLoggedIn,getCartProductsByUserId);
//chat routes
router.post('/v1/chats/users/:id',createChatSchema,createChat);
protectedRouter.delete('/v1/chats/user-chatted/:cid',getChatByIdSchema,allowIfLoggedIn,deleteChatById);
protectedRouter.get('/v1/chats/user-chatted/:cid',getChatByIdSchema,allowIfLoggedIn,getChatById);
protectedRouter.put('/v1/chats/user-chatted/:cid',updateChatSchema,allowIfLoggedIn,updateChatById);
protectedRouter.get('/v1/chats/users/:id',getChatProductsByUserIdSchema,allowIfLoggedIn,getChatsByUserId);

//Customer routes
protectedRouter.get('/v1/customers/:id',getCustomerByIdSchema,allowIfLoggedIn,getCustomerById);
//Administrator role
protectedRouter.get('/v1/admins/managed-chat/',getCartProductsByUserIdSchema,allowIfLoggedIn,grantAccess('readAny','profile'),getCartProducts);
protectedRouter.get('/v1/admins/managed-cart/',getCartProductsByUserIdSchema,allowIfLoggedIn,grantAccess('readAny','profile'),getChats);
protectedRouter.get('/v1/admins/managed-user/',allowIfLoggedIn,grantAccess('readAny','profile'),getUsers);
protectedRouter.get('/v1/admins/managed-user/:id',schemaGet,allowIfLoggedIn,grantAccess('readAny','profile'),getUserById);
protectedRouter.delete('/v1/admins/managed-user/:id',schemaDelete,allowIfLoggedIn,grantAccess('deleteAny','profile'),deleteUserById);
protectedRouter.put('/v1/admins/managed-user/:id',schemaDelete,allowIfLoggedIn,grantAccess('updateAny','profile'),deleteUserById);
protectedRouter.delete('/v1/admins/managed-carted-user/:id',getCartByIdSchema,allowIfLoggedIn,grantAccess('deleteAny','profile'),deleteCartProductById);
protectedRouter.delete('/v1/admins/managed-chatted-user/:id',getCartByIdSchema,allowIfLoggedIn,grantAccess('deleteAny','profile'),deleteChatById);
protectedRouter.put('/v1/admins/managed-user/deactivated-account/:id',deactivateUserById);
protectedRouter.post( '/v1/admins/managed-user/activated-account',activateUser);


module.exports = router;
