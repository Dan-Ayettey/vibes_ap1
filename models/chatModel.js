//modules or lib
const mongoose=require('mongoose');
const Schema=mongoose.Schema;
// constructor
function getDateCreated(date){
    return  date;
}
function getDateUpdated(date){
    return  date;
}
function getText(text){
    return  text;
}
function getLinks(url){
    return  url;
}
function getFromUser(text){
    return  text;
}
const Chat=new Schema({
    text:{
        type:[],
        required:[true, 'Message from  are needed'],
        set:getText
    },
    html:{
        type:[],
        set:getText
    },
    _user_id:{
        type: String,
        required:[true, 'user id is needed'],

    },
    sent_at:{
        type: String,
    },
    fromUser:{
        type: {},
        required:[true, 'from user is needed'],
        set:getFromUser

    },
    toUser:{
        type: {},
        required:[true, 'from user is needed'],
        set:getFromUser

    },
    isRead:{
        type:Boolean
    },
    NumberOfReaders:{
      type:Number
    },
    _links:{
        type:[],
        set:getLinks
    },
    edited_at:{
        type:String,
        set:getDateUpdated,
    },
    isAvailable:{
        type:Boolean,
    },
    mentions:{
        type:[],
        set:getText
    },
    issues:{
        type:[]
    },
});

const chatModel=mongoose.model('Chat',Chat);
module.exports={
    chatModel
};
