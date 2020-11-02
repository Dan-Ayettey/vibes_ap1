//instances
const mongoose=require('mongoose');

//cart schema
const cartSchema=new mongoose.Schema({
  _user_id:{
      type:String,
      required:[true, 'user id is required']
  },
    customer:{
        type:Array,
        required:[true, 'customer details is required']
    },
    total:{
        type:String,
        required:[true, 'total is required']
    },
    carrier:{
            type:String,
    },
    dateFrom:{
        type:String,

    },
    dateTo:{
        type:String,

    },
    isOnLine:{
        type:Boolean,

    },
    _links:{
      type:[]
    },
  items:{
      type:Array,
      required:[true, 'items are required']
  }
});

//modules
const cartModel=mongoose.model('Product',cartSchema);
module.exports={
    cartModel
};
