//instances
const mongoose=require('mongoose');

//cart schema
const CreditSlipsSchema=new mongoose.Schema({
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

})
const creditSlipsModel=mongoose.model('CreditSlips',CreditSlipsSchema);
module.exports={
 creditSlipsModel,
}
