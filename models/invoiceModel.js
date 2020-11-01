const mongoose=require('mongoose');
const Schema=mongoose.Schema;
function getDateCreated(date){
    return  date;
}
// Date updated constructor
function getDateUpdated(date){
    return  date;
}
function getDateFrom(date){
    return  date;
}

function getDateTo(date){
    return  date;
}
const Invoice=new Schema({

    dateFrom:{
        type:String,
        set:getDateFrom

    },
    dateTo:{
        type:String,
        set:getDateTo

    },
    _user_id:{
        type:String,
        required:[true, 'user id is needed'],

    },
    created_at:{
        type:String,
        set:getDateCreated
    }
    ,updated_at:{
        type:String,
        set:getDateUpdated,
    }
    ,orderStatuses:{
        type:Array,
    },
    isOption:{
        type:[],
    },
    invoiceNumber:{
        type:String,
        set:mongoose.Types.ObjectId,
        auto:true
    },
    date:{
        type:String,
    },
    invoiceType:{
        type:String,
    },


});

const invoiceModel=mongoose.model('Comments',Invoice);
module.exports={
    invoiceModel
};
