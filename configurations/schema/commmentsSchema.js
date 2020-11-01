const {checkSchema,validationResult}=require('express-validator');
const createCommentSchema=checkSchema({
   user_id:{
       in:["body","params"],
       isString:true,
       isEmpty:false,
       exists:true,
       errorMessage:'user id is needed'
   } ,
    comments:{
        in:["body","params"],
        isArray:true,
        isEmpty:false,
        exists:true,
        errorMessage:'comments are needed'
    }
});

const getCommentByIdSchema=checkSchema({
    id:{
        in:["body","params"],
        isString:true,
        isEmpty:false,
        exists:true,
        errorMessage:'user id is needed'
    } ,

});
const deleteCommentByIdSchema=checkSchema({
    id:{
        in:["body","params"],
        isString:true,
        isEmpty:false,
        exists:true,
        errorMessage:'user id is needed'
    } ,

});
const getCommentsByUserIdSchema=checkSchema({
    id:{
        in:["body","params"],
        isString:true,
        isEmpty:false,
        exists:true,
        errorMessage:'user id is needed'
    } ,

});
const updateCommentByIdSchema=checkSchema({
    user_id:{
        in:["body","params"],
        isString:true,
        isEmpty:false,
        exists:true,
        errorMessage:'user id is needed'
    } ,
    comments:{
        in:["body","params"],
        isArray:true,
        isEmpty:false,
        exists:true,
        errorMessage:'comments are needed'
    }
});
module.exports={
    getCommentByIdSchema,
    createCommentSchema,
    updateCommentByIdSchema,
    deleteCommentByIdSchema,
    getCommentsByUserIdSchema,
    validationResult
}
