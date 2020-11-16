//dependencies
const express = require('express');
const {grantAccess,allowIfLoggedIn}=require('../configurations/auth/grantAccess');
const {createUser,getUserById,getUsers,authorizeUser, deactivateUserById, activateUser, updateUserById,deleteUserById,
    renewPasswordById,veryToken,renewSecretById,getCustomerById}= require("../controllers/userController");
const {apiVer } = require("../controllers/versionController");
const {deleteCartProductById,createCartProduct,getCartProducts,
    getCartProductById,updateCartProductById,getCartProductsByUserId}=require('../controllers/cartController');
const {createCartSchema,updateCartSchema,getCartByIdSchema,getCartProductsByUserIdSchema}=require('../configurations/schema/cartSchema');
const {withJWTAuthMiddleware}=require('express-kun');
const {schemaUpdate,getCustomerByIdSchema,schemaRenewPassword,schemaCreate,schemaGet,schemaAuth,schemaActivate,schemaDelete,schemaRenewSecretMessage}
= require("../configurations/schema/userSchema");
const{createChat,deleteChatById,getChatById,getChats,getChatsByUserId,updateChatById}=require('../controllers/chatController');
const {createChatSchema,getChatByIdSchema,getChatByUserIdSchema,updateChatSchema}=require('../configurations/schema/chatSchema');
const{findOneDetailAndAddById,findOneFollowerAndAddById,findOneFollowerAndDeleteById,findOneDetailAndDeleteById,getContactById,getContacts,createContact,updateContactById, deleteContactById,getContactsByUserId,deactivateContactById,activateContactById}=require('../controllers/contactController');
const {createContactSchema,getFindOneAndUpdateSchema,updateContactByIdSchema,deleteContactsByIdSchema,getContactsByUserIdSchema,getContactByIdSchema}=require('../configurations/schema/contactSchema');
const router = express.Router();
const protectedRouter=withJWTAuthMiddleware(router,process.env.JWT_SECRET);

/* RoutersBasic role */
router.get('/v1/',apiVer);
router.all('/',apiVer);
router.post('/v1/users',schemaCreate,createUser);
//router.post('/v1/payments',createStripeChargeIntent);
router.post('/v1/users/auth',schemaAuth,authorizeUser);
router.use(veryToken);

router.post('/v1/users/activated-account',schemaActivate,activateUser);
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
router.post('/v1/chats',createChatSchema,allowIfLoggedIn,createChat);
protectedRouter.delete('/v1/chats/:cid',getChatByIdSchema,allowIfLoggedIn,deleteChatById);
protectedRouter.get('/v1/chats/:cid',getChatByIdSchema,allowIfLoggedIn,getChatById);
protectedRouter.put('/v1/chats/:cid',updateChatSchema,allowIfLoggedIn,updateChatById);
protectedRouter.get('/v1/chats/received/from',getChatByUserIdSchema,allowIfLoggedIn,getChatsByUserId);
//contact routes
router.post('/v1/contacts/user/id',createContactSchema,allowIfLoggedIn,createContact);
protectedRouter.put('/v1/contacts/:cid/deactivated-contact',getContactByIdSchema,allowIfLoggedIn,deactivateContactById);
protectedRouter.put('/v1/contacts/:cid/activated-contact',getContactByIdSchema,allowIfLoggedIn,activateContactById);
protectedRouter.get('/v1/contacts/:cid',getContactByIdSchema,allowIfLoggedIn,getContactById);
protectedRouter.put('/v1/contacts/:cid',updateContactByIdSchema,allowIfLoggedIn,updateContactById);
protectedRouter.put('/v1/contacts/managed-followers-user/:cid',getContactByIdSchema,allowIfLoggedIn,findOneFollowerAndAddById);
protectedRouter.delete('/v1/contacts/managed-followers-user/:cid',getFindOneAndUpdateSchema,allowIfLoggedIn,findOneFollowerAndDeleteById);
protectedRouter.put('/v1/contacts/managed-details-user/:cid',getContactByIdSchema,allowIfLoggedIn,findOneDetailAndAddById);
protectedRouter.delete('/v1/contacts/managed-details-user/:cid',getFindOneAndUpdateSchema,allowIfLoggedIn,findOneDetailAndDeleteById);
protectedRouter.get('/v1/contacts/user/:id',getContactsByUserIdSchema,allowIfLoggedIn,getContactsByUserId);

//Customer routes
protectedRouter.get('/v1/customers/:id',getCustomerByIdSchema,allowIfLoggedIn,getCustomerById);
//Administrator role
protectedRouter.get('/v1/admins/managed-chats/',allowIfLoggedIn,grantAccess('readAny','profile'),getChats);
protectedRouter.get('/v1/admins/managed-chats/',getCartProductsByUserIdSchema,allowIfLoggedIn,grantAccess('readAny','profile'),getCartProducts);
protectedRouter.get('/v1/admins/managed-contacts/',allowIfLoggedIn,grantAccess('readAny','profile'),getContacts);
protectedRouter.delete('/v1/admins/managed-contact/:cid',deleteContactsByIdSchema,allowIfLoggedIn,grantAccess('readAny','profile'),deleteContactById);
protectedRouter.get('/v1/admins/managed-carts/',getCartProductsByUserIdSchema,allowIfLoggedIn,grantAccess('readAny','profile'),getChats);
protectedRouter.get('/v1/admins/managed-users/',allowIfLoggedIn,grantAccess('readAny','profile'),getUsers);
protectedRouter.get('/v1/admins/managed-user/:id',schemaGet,allowIfLoggedIn,grantAccess('readAny','profile'),getUserById);
protectedRouter.delete('/v1/admins/managed-user/:id',schemaDelete,allowIfLoggedIn,grantAccess('deleteAny','profile'),deleteUserById);
protectedRouter.put('/v1/admins/managed-user/:id',schemaDelete,allowIfLoggedIn,grantAccess('updateAny','profile'),deleteUserById);
protectedRouter.delete('/v1/admins/managed-carted-user/:id',getCartByIdSchema,allowIfLoggedIn,grantAccess('deleteAny','profile'),deleteCartProductById);
protectedRouter.delete('/v1/admins/managed-chatted-user/:id',getCartByIdSchema,allowIfLoggedIn,grantAccess('deleteAny','profile'),deleteChatById);
protectedRouter.put('/v1/admins/managed-user/deactivated-account/:id',deactivateUserById);
protectedRouter.post( '/v1/admins/managed-user/activated-account',activateUser);


module.exports = router;
