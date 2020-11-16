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

function getFromUser(text){
    return  text;
}
const Chat=new Schema({
    text:{
        type:String,
        required:[true, 'Message from  are needed'],
        set:getText
    },
    html:{
        type:[],
        set:getText
    },

    sent_at:{
        type: String,
    },
    fromUser:{
        type: String,
        required:[true, 'from user is needed'],
        set:getFromUser

    },
    toUser:{
        type: String,
        required:[true, 'from user is needed'],
        set:getFromUser

    },
    isRead:{
        type:Boolean
    },
    NumberOfReaders:{
      type:Number
    },

    edited_at:{
        type:String,
        set:getDateUpdated,
    },
    isAvailable:{
        type:Boolean,
    },
    created_at:{
        type:String,
        set:getDateCreated
    } ,
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
