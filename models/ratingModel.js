const mongoose=require('mongoose');
const Schema=mongoose.Schema;
 const getRating=function (rating){
     return rating;
}
const Rating=new Schema({
    rating:{
        type:[],
        required:[true, 'comments are needed'],
        set:[getRating]

    },
    _user_id:{
        type:String,
        required:[true, 'user id is needed'],

    }
});

const ratingModel=mongoose.model('Rating',Rating);
module.exports={
 ratingModel
};
