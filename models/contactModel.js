const mongoose=require('mongoose');
const Schema=mongoose.Schema;


function getDateCreated(date){
    return  date;
}
// Date updated constructor
function getDateUpdated(date){
    return  date;
}

function getEmail(email){
    return  email;
}
function getFollowers(followers){
    return  followers;
}
function getDetails(details){
    return  details;
}
function getCellNumber(email){
    return  email;
}
function getLinks(url){
    return  url;
}
const Contact=new Schema({
    _links:{
        type:[],
        set:getLinks
    },
    email:{
            type:String,
            unique:true,
            required:[true, 'contact information needed'],
            set:getEmail

    },
    telephoneNumber:{
        type:[],
        set:getCellNumber

    },
   details:{
            type:[],
           set:getDetails
    },

    followers:{
        type:[],
        set:getFollowers,

    },
    _user_id:{
        type: String,
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
    ,isActive:{
        type:Boolean,
    }
});

const contactModel=mongoose.model('Contact',Contact);
module.exports={
    contactModel
};
