const {checkSchema,validationResult}=require('express-validator');
const createRatingSchema=checkSchema({
    user_id:{
        in:["body","params"],
        isString:true,
        isEmpty:false,
        exists:true,
        errorMessage:'user id is needed'
    } ,
    Ratings:{
        in:["body","params"],
        isArray:true,
        isEmpty:false,
        exists:true,
        errorMessage:'Ratings are needed'
    }
});

const getRatingByIdSchema=checkSchema({
    id:{
        in:["body","params"],
        isString:true,
        isEmpty:false,
        exists:true,
        errorMessage:'user id is needed'
    } ,

});
const deleteRatingByIdSchema=checkSchema({
    id:{
        in:["body","params"],
        isString:true,
        isEmpty:false,
        exists:true,
        errorMessage:'user id is needed'
    } ,

});
const getRatingByUserIdSchema=checkSchema({
    id:{
        in:["body","params"],
        isString:true,
        isEmpty:false,
        exists:true,
        errorMessage:'user id is needed'
    } ,

});
const updateRatingByIdSchema=checkSchema({
    user_id:{
        in:["body","params"],
        isString:true,
        isEmpty:false,
        exists:true,
        errorMessage:'user id is needed'
    } ,
    Ratings:{
        in:["body","params"],
        isArray:true,
        isEmpty:false,
        exists:true,
        errorMessage:'Ratings are needed'
    }
});
module.exports={
    getRatingByIdSchema,
    createRatingSchema,
    updateRatingByIdSchema,
    deleteRatingByIdSchema,
    getRatingByUserIdSchema,
    validationResult
}
