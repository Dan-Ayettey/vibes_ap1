//instances
const {chatModel}=require('../models/chatModel');
const {validationResult} = require("../configurations/schema/chatSchema");

//Constructs
const createChat=async function (request,response,next) {

    const errors=validationResult(request);
    if(errors.isEmpty()){
        request.body._links = [

            {
                rel: 'self', href: '/v1/chats/users/:id', action: 'POST',
                types: ["application/x-www-form-urlencoded"], authorization: 'token'
            },
            {
                rel: 'self', href: '/v1/chats/:cid/managed-chats-user/:id', action: 'PUT',
                types: ["application/x-www-form-urlencoded"], authorization: 'token'
            },
            {
                rel: 'self', href: '/v1/chats/:id', action: 'GET',
                types: ["application/x-www-form-urlencoded"], authorization: 'token'
            },
            {
                rel: 'self', href: '/v1/chats/users/:id', action: 'GET',
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
                rel: 'self', href: '/v1/admins/managed-chatted-users/:id', action: 'DELETE',
                types: ["application/x-www-form-urlencoded"], authorization: 'token'
            },
        ];

        try {

            request.body._user_id=request.body.id? request.body.id:request.params.id;
            request.body.sent_at=new Date();
            const cart = await chatModel.create(request.body);
            console.log("Hold");
            if(cart){
                response.status(201).json({
                    cart,
                    isCreated: true,
                });
            }else {
                response.status(401).json({msg: 'Unauthorized',isCreated:false});
            }

        }catch (e) {
            next(e.message);
            console.log(e);
        }
    }else {
        response.status(401).json(errors);
    }
};
const getChats=async function (request,response,next) {

    try {
        const chat=await chatModel.find({});
        if(chat){
            response.status(200).json(chat);
        }
        else {
            response.status(401).json({msg: 'Unauthorized'});
        }
    }catch (e) {
        next(e._message);
        console.log(e);
    }
};
const getChatsByUserId=async function (request,response,next) {
    const errors =validationResult(request);

    if(errors.isEmpty()){
        try {
            const _user_id=request.body.id ? request.body.id:request.params.id;
            const chat=await chatModel.find({_user_id});
            if(chat){
                response.status(200).json(chat);
            }
            else {
                response.status(401).json({msg: 'Unauthorized'});
            }
        }catch (e) {
            next(e.message);
            console.log(e);
        }
    }else {
        response.status(401).json(errors);
    }




};
const getChatById=async function (request,response,next) {
    const _id=request.body.cid ? request.body.cid:request.params.cid;
    const errors=validationResult(request);
    

    if(errors.isEmpty()){
        try {
            const chat=await chatModel.findOne({_id});
            console.log(chat);
            if(chat){
                const id=request.body.id ? request.id :request.params.id;
                if(id===chat._user_id){
                    response.status(200).json(chat);
                }else {
                    response.status(200).json(chat);
                }

            }
            else {
                response.status(401).json({msg: 'Unauthorized'});
            }
        }catch (e) {
            next(e.message);
            console.log(console,e);
        }

    }else {
        response.status(401).json(errors);
    }
};
const deleteChatById=async function (request,response,next) {
    const _id=request.body.cid ? request.body.cid:request.params.cid;
    const errors=validationResult(request);
    if(errors.isEmpty()){
        try {
            const chat=await chatModel.findOneAndDelete({_id});
            if(chat){
                response.status(200).json({id:chat.id,msg: 'deleted',isDeleted:true});
            }
            else {
                response.status(401).json({msg: 'Unauthorized',isDeleted:false});
            }
        }catch (e) {
            next(e.message);
            console.log(e);
        }

    }else {
        response.status(401).json(errors);
    }
};
const updateChatById=async function (request,response,next) {
    const _id=request.body.cid ? request.body.cid:request.params.cid;
    request.body.edited_at=new Date();

    const errors=validationResult(request);

    if(errors.isEmpty()){
        try {
            const chat=await chatModel.findOne({_id});
            if(chat){
                chat.text=request.body.text;
                await chat.save();
                response.status(200).json(chat);
            } else {
                response.status(401).json({msg: 'Unauthorized',isUpdated:false});
            }

        }catch (e) {
            next(e.message);
            console.log(e);
        }

    }else {
        response.status(401).json(errors);
    }
};

//modules
module.exports={
    updateChatById,
    getChatById,
    getChats,
    createChat,
    getChatsByUserId,
    deleteChatById,

};
