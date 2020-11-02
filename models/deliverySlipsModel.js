//instances
const mongoose=require('mongoose');

//cart schema
const DeliverySlipsSchema=new mongoose.Schema({
    _user_id:{
        type:String,
        required:[true, 'user id is needed'],

    },
    _order_id:{
        type:String,
        required:[true, 'user id is needed'],

    },
    dateIssued:{
        type:String,
        required:[true, 'user id is needed'],

    },
    deliveryPrefix:{
        type:String,


    },
    deliveryNumber:{
        type:String,

    },
    img:{
        type:[],

    },

})
const deliverySlipsModel=mongoose.model('CreditSlips',DeliverySlipsSchema);
module.exports={
    deliverySlipsModel,
}
