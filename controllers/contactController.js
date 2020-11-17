/**
 * Created by ictte on 13/11/2020.
 */
const {userModel} = require("../models/userModel");
// import libs
const {validationResult}=require('../configurations/schema/contactSchema');
const {contactModel}=require('../models/contactModel');
//composites or constructs
const createContact=async function (request,response,next) {
    const errors=validationResult(request);
    if(errors.isEmpty()){
        request.body._user_id=request.body.id ? request.body.id:request.params.id;

        request.body._links = [

            {
                rel: 'self', href: '/v1/contacts', action: 'POST',
                types: ["application/x-www-form-urlencoded"], authorization: 'token'
            },
            {
                rel: 'self', href: '/v1/contacts/:cid/managed-contacted-user/:id', action: 'PUT',
                types: ["application/x-www-form-urlencoded"], authorization: 'token'
            },
            {
                rel: 'self', href: '/v1/contacts/:id', action: 'GET',
                types: ["application/x-www-form-urlencoded"], authorization: 'token'
            },
            {
                rel: 'self', href: '/v1/contacts/user/:id', action: 'GET',
                types: ["application/x-www-form-urlencoded"], authorization: 'token'
            },
            {
                rel: 'self', href: '/v1/contacts/:id/activate-contact', action: 'PUT',
                types: ["application/x-www-form-urlencoded"], authorization: 'token'
            },
            {
                rel: 'self', href: '/v1/contacts/:id/deactivate-contact', action: 'PUT',
                types: ["application/x-www-form-urlencoded"], authorization: 'token'
            },
            {
                rel: 'self', href: '/v1/contacts/:cid/managed-contacted-user/:id', action: 'DELETE',
                types: ["application/x-www-form-urlencoded"], authorization: 'token'
            },
            {
                rel: 'self', href: '/v1/admins/managed-contacted-user/:id', action: 'PUT',
                types: ["application/x-www-form-urlencoded"], authorization: 'token'
            },
            {
                rel: 'self', href: '/v1/admins/managed-contacted-user/:id', action: 'DELETE',
                types: ["application/x-www-form-urlencoded"], authorization: 'token'
            },

            {
                rel: 'self', href: '/v1/chats', action: 'POST',
                types: ["application/x-www-form-urlencoded"], authorization: 'token'
            },
            {
                rel: 'self', href: '/v1/chats/:cid/managed-chatted-user/:id', action: 'PUT',
                types: ["application/x-www-form-urlencoded"], authorization: 'token'
            },
            {
                rel: 'self', href: '/v1/chats/:id', action: 'GET',
                types: ["application/x-www-form-urlencoded"], authorization: 'token'
            },
            {
                rel: 'self', href: '/v1/chats/user/:id', action: 'GET',
                types: ["application/x-www-form-urlencoded"], authorization: 'token'
            },
            {
                rel: 'self', href: '/v1/chats/:id/activate-chatted', action: 'PUT',
                types: ["application/x-www-form-urlencoded"], authorization: 'token'
            },
            {
                rel: 'self', href: '/v1/chats/:id/deactivate-chatted', action: 'PUT',
                types: ["application/x-www-form-urlencoded"], authorization: 'token'
            },
            {
                rel: 'self', href: '/v1/chats/:cid/managed-chatted-user/:id', action: 'DELETE',
                types: ["application/x-www-form-urlencoded"], authorization: 'token'
            },
            {
                rel: 'self', href: '/v1/admins/managed-chatted-user/:id', action: 'PUT',
                types: ["application/x-www-form-urlencoded"], authorization: 'token'
            },
            {
                rel: 'self', href: '/v1/admins/managed-chatted-user/:id', action: 'DELETE',
                types: ["application/x-www-form-urlencoded"], authorization: 'token'
            },
        ];
        try{
            request.body.created_at=new Date();
            request.body.isAvailable=true;
            request.body.isActive=true;
            const _user_id=request.body._user_id;
            const email=request.body.email;

             const user=await userModel.findOne({email});
             if(user){
                 const contacts=await contactModel.find({_user_id});
                 const isEqual=checkEquality(...contacts.map(data => data.email===email));

                 if(isEqual){
                     response.status(409).json({msg: 'The '+email+' conflict with current state of the target resource', isAvailable:true});

                 }else{
                   let createContact= await contactModel.create(request.body);
                     if(createContact){
                         response.status(200).json({createContact,isCreated:createContact.isActive});
                     }

                 }
             }else {
                 response.status(406).json({msg: 'Does not find any content following the criteria given by the user agent.' +
                         ' Create the user or check with admin team',isExist:false});

             }


        }catch (e) {
            next({error:e.message,msg:'might be server error'});
            console.log(e.message);
        }
    }else {
        response.status(400).json(errors);
    }

};

const checkEquality=function(any){
    return any
};
const getContactById=async function (request,response,next) {
    const errors=validationResult(request);
    if(errors.isEmpty()){
        const _id=request.body.id ? request.body.id:request.params.id;
        try{

            const contact=await contactModel.findOne({_id});
            if(contact){

                    response.status(200).json({contact});

            }else{
                response.status(401).json({msg: 'Unauthorized', ...contact, isAvailable: false});
            }

        }catch (e) {
            next({error:e.message,msg:'might be server error'});
            console.log(e.message);
        }
    }else {
        response.status(400).json(errors);
    }

};
const getContacts=async function (request,response,next) {
    const errors=validationResult(request);
    if(errors.isEmpty()){
        try{

            const contact=await contactModel.find({});
            if(contact) {
                response.status(200).json({numberOfContacts: contact.length, contact});

            }else{
                response.status(401).json({msg: 'Unauthorized', isAvailable: contact.isAvailable});
            }

        }catch (e) {
            next({error:e.message,msg:'might be server error'});
            console.log(e.message);
        }
    }else {
        response.status(400).json(errors);
    }

};
const deleteContactById=async function (request,response,next) {
    const errors=validationResult(request);
    if(errors.isEmpty()){
        const _id=request.body.id ? request.body.id:request.params.id;
        try{

            const contact=await contactModel.findByIdAndDelete({_id});
            if(contact){
                response.status(200).json(contact);
            }else{
                response.status(401).json({msg: 'Unauthorized', ...contact, isDeleted: false});
            }

        }catch (e) {
            next({error:e.message,msg:'might be server error'});
            console.log(e.message);
        }
    }else {
        response.status(400).json(errors);
    }

};
const getContactsByUserId=async function (request,response,next) {
    const errors=validationResult(request);
    if(errors.isEmpty()){
        const _user_id=request.body.user_id ? request.body.user_id:request.params.id;
        try{
            const contact=await contactModel.find({_user_id});
            if(contact) {
                    response.status(200).json({numberOfContacts: contact.length, contact});

            }else{
                response.status(401).json({msg: 'Unauthorized', isAvailable: false});
            }

        }catch (e) {
            next({error:e.message,msg:'might be server error'});
            console.log(e.message);
        }
    }else {
        response.status(400).json(errors);
    }

};
const findOneFollowerAndAddById=async function (request,response,next) {
    const errors=validationResult(request);
    if(errors.isEmpty()){
        const _id=request.body.id ? request.body.id:request.params.id;
        try{
            const update=await contactModel.findOne({_id});

            if(update && update.isActive){
                delete request.body.details;
                delete request.body.email;
                let count=update.followers.length++;
                request.body.edited_at=new Date();
                update.followers[count]=request.body.followers;
                request.body.followers=update.followers;
                const find = await contactModel.findByIdAndUpdate({_id},{...request.body});
                response.status(200).json({updated_at:find.edited_at, isUpdated: true});

            }else{
                response.status(401).json({msg: 'Unauthorized', isUpdated: false});
            }

        }catch (e) {
            next({error:e.message,msg:'might be server error'});
            console.log(e.message);
        }
    }else {
        response.status(400).json(errors);
    }
};
const findOneDetailAndAddById=async function (request,response,next) {
    const errors=validationResult(request);
    if(errors.isEmpty()){
        const _id=request.body.id ? request.body.id:request.params.id;
        const {detailsIndex}=request.body;

        try{
            const update=await contactModel.findOne({_id});

            if(update && update.isActive){
                delete request.body.followers;
                delete request.body.email;
                let count=update.followers.length++;
                request.body.edited_at=new Date();
                update.details[count]=request.body.details;
                request.body.details=update.details;
                const find = await contactModel.findByIdAndUpdate({_id},{...request.body});
                response.status(200).json({updated_at:find.edited_at, isUpdated: true});

            }else{
                response.status(401).json({msg: 'Unauthorized', isUpdated: false});
            }

        }catch (e) {
            next({error:e.message,msg:'might be server error'});
            console.log(e.message);
        }
    }else {
        response.status(400).json(errors);
    }

};
const findOneFollowerAndDeleteById=async function (request,response,next) {
    const errors=validationResult(request);
    if(errors.isEmpty()){
        const _id=request.body.id ? request.body.id:request.params.id;
        const {index}=request.body;

        try{
            const update=await contactModel.findOne({_id});

            if(update && update.isActive){
                request.body.edited_at=new Date();
                update.followers.splice(index,1);
                request.body.followers=update.followers;
                const updated = await contactModel.findByIdAndUpdate({_id},{...request.body});
                response.status(200).json({updated_at:updated.edited_at, isDeleted: true});

            }else{
                response.status(401).json({msg: 'Unauthorized', isDeleted: false});
            }

        }catch (e) {
            next({error:e.message,msg:'might be server error'});
            console.log(e.message);
        }
    }else {
        response.status(400).json(errors);
    }

};
const findOneDetailAndDeleteById=async function (request,response,next) {
    const errors=validationResult(request);
    if(errors.isEmpty()){
        const _id=request.body.id ? request.body.id:request.params.id;
        const {index}=request.body;
        try{
            const update=await contactModel.findOne({_id});
            if(update && update.isActive){
                request.body.edited_at=new Date();
                 update.details.splice(index,1);
                 request.body.details=update.details;
                const updated = await contactModel.findByIdAndUpdate({_id},{...request.body});
                response.status(200).json({updated_at:updated.edited_at, isDeleted: true});
            }else{
                response.status(401).json({msg: 'Unauthorized', isDeleted: false});
            }

        }catch (e) {
            next({error:e.message,msg:'might be server error'});
            console.log(e.message);
        }
    }else {
        response.status(400).json(errors);
    }
};
const updateContactById=async function (request,response,next) {
    const errors=validationResult(request);
    if(errors.isEmpty()){
        const _id=request.body.id ? request.body.id:request.params.id;
        const {detailsIndex,followersIndex}=request.body;
        try{
            const update=await contactModel.findOne({_id});

            if(update && update.isActive){
                request.body.edited_at=new Date();
                request.body.email= request.body.email ? request.body.email: update.email;
                update.details[detailsIndex]=request.body.details ? request.body.details: update.details[detailsIndex];
                update.followers[followersIndex]=request.body.followers ? request.body.followers : update.followers[followersIndex];
                request.body.details=update.details;
                request.body.followers=update.followers;
                const updated = await contactModel.findByIdAndUpdate({_id},{...request.body});
                response.status(200).json({updated_at:updated.updated_at, isUpdated: true});

            }else{
                response.status(401).json({msg: 'Unauthorized', isUpdated: false});
            }

        }catch (e) {
            next({error:e.message,msg:'might be server error'});
            console.log(e.message);
        }
    }else {
        response.status(400).json(errors);
    }

};
const activateContactById=async function (request,response,next) {
    const errors=validationResult(request);
    if(errors.isEmpty()){
        const _id=request.body.id ? request.body.id:request.params.id;
        try{
            const update=await contactModel.findById({_id});
            if(update){
                request.body.edited_at=new Date();
                update.isActive=true;
                update.save();
                response.status(200).json({update});
            }else{
                response.status(401).json({msg: 'Unauthorized', isActivated: false});
            }

        }catch (e) {
            next({error:e.message,msg:'might be server error'});
            console.log(e.message);
        }
    }else {
        response.status(400).json(errors);
    }

};
const deactivateContactById=async function (request,response,next) {
    const errors=validationResult(request);
    if(errors.isEmpty()){
        const _id=request.body.id ? request.body.id:request.params.id;
        try{
            const update=await contactModel.findById({_id});
            if(update){
                if(update.isActive){
                    request.body.edited_at=new Date();
                    update.isActive=false;
                    update.save();
                    response.status(200).json(update);
                }else {
                    response.status(401).json({msg: 'Unauthorized', isDeactivated: true});
                }

            }else{
                response.status(401).json({msg: 'Unauthorized', isDeactivated: false});
            }

        }catch (e) {
            next({error:e.message,msg:'might be server error'});
            console.log(e.message);
        }
    }else {
        response.status(400).json(errors);
    }

};
module.exports= {
    getContactById,
    createContact,
    deactivateContactById,
    activateContactById,
    updateContactById,
    deleteContactById,
    getContactsByUserId,
    findOneFollowerAndAddById,
    findOneDetailAndAddById,
    findOneFollowerAndDeleteById,
    findOneDetailAndDeleteById,
    getContacts
};

