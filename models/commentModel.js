const mongoose=require('mongoose');
const Schema=mongoose.Schema;
function getDateCreated(date){
    return  date;
}
// Date updated constructor
function getDateUpdated(date){
    return  date;
}
const Comment=new Schema({
    comments:{
        type:[],
        required:[true, 'comments are needed'],

    },
    _user_id:{
        type:[],
        required:[true, 'user id is needed'],

    },
    created_at:{
        type:String,
        set:getDateCreated
    }
    ,edited_at:{
        type:String,
        set:getDateUpdated,
    }
    ,isAvailable:{
        type:Boolean,
    }
});

const commentModel=mongoose.model('Comments',Comment);
module.exports={
    commentModel
};
