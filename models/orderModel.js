const mongoose=require('mongoose');
const Schema=mongoose.Schema;
function getDateCreated(date){
    return  date;
}
// Date updated constructor
function getDateUpdated(date){
    return  date;
}
function getDate(date){
    return  date;
}
const Order=new Schema({
    reference:{
        type:[],
        required:[true, 'Reference is needed'],

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
    ,isAvailable:{
        type:Boolean,
    },
    isNewClient:{
    type:Boolean,
    },
    delivery:{
        type:String,
    },
    customer:{
        type:String,
    },
    total:{
        type:Number,
    },
    payment:{
        type:String,
    },
    status:{
        type:String,
    },
    date:{
        type:String,
        set:getDate
    }

});

const orderModel=mongoose.model('Comments',Order);
module.exports={
    orderModel
};
