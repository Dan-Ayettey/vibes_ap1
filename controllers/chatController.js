//instances
const {contactModel} =require('../models/contactModel');
const {chatModel}=require('../models/chatModel');
const {validationResult} = require("../configurations/schema/chatSchema");

//Constructs
const createChat=async function (request,response,next) {

    const errors=validationResult(request);
    if(errors.isEmpty()){

        try {
            request.body.sent_at=new Date();
            request.body.isActive=true;
            const email=request.body.toUser;
            const telephoneNumber=request.body.telephoneNumber;
            const chat = await chatModel.create(request.body);
            const contact = await contactModel.findOne({email} || {telephoneNumber});
            if(contact){
                if(chat){
                    response.status(201).json({
                        chat,
                        isCreated: true,
                    });
                }else {
                    response.status(401).json({msg: 'Unauthorized',isCreated:false});
                }
            }else {
         response.status(401).json({msg: 'Unauthorized, can not find the receiver in your contact. Add receiver to contact',isCreated:false});
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
        const chats=await chatModel.find({});
        if(chats){
            response.status(200).json({chats});
        }
        else {
            response.status(401).json({msg: 'Unauthorized'});
        }
    }catch (e) {
        next(e._message);
        console.log(e);
    }
};

const getSentChats=async function (request,response,next) {
    const fromUser=request.body.fromUser;
    const toUser=request.body.toUser;
    const errors =validationResult(request);

    if(errors.isEmpty()){
        try {
            const sent=await chatModel.find({});
            let sentData=[];
            if(sent){
                sent.map((data)=>data.fromUser === fromUser && data.toUser===toUser ? sentData.push(data):"");
                response.status(200).json({numberOfSent:sentData.length,sentData});
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
const getChatsByUserId=async function (request,response,next) {
    const fromUser=request.body.fromUser ?request.body.fromUser:request.params.id;
    const errors =validationResult(request);

    if(errors.isEmpty()){
        try {
            const email=request.body.toUser;
            const telephoneNumber=request.body.telephoneNumber;
            const contact = await contactModel.findOne({email} || {telephoneNumber});
            if(contact){
                const chats=await chatModel.find({fromUser});
                if(chats){
                    response.status(200).json({chats});
                }
                else {
                    response.status(401).json({msg: 'Unauthorized'});
                }
            }else {
                response.status(401).json({msg: 'Unauthorized, can not find the chat in your contact. Add receiver to contact',isAvailable:false});
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
            if(chat){
                const id=request.body.id ? request.id :request.params.id;
                if(id===chat._user_id){
                    response.status(200).json({chat});
                }else {
                    response.status(200).json({chat});
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
            const updated=await chatModel.findOneAndUpdate({_id},request.body);
            if(updated){

                response.status(200).json({updated_at:updated.edited_at, isUpdated: true});
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
    getSentChats

};
