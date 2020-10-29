//instances
const mongoose=require('mongoose');

//cart schema
const cartSchema=new mongoose.Schema({
  _user_id:{
      type:String,
      required:[true, 'user id is required']
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
