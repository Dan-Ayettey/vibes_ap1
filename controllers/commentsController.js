// import libs
const {validationResult}=require('../configurations/schema/commmentsSchema');
const {commentModel}=require('../models/commentModel');
//composites or constructs
const createComment=async function (request,response,next) {
    const errors=validationResult(request)
    if(errors.isEmpty()){
        request.body.id=request.body.id ? request.body.id:request.params.id;
        try{
            request.body.created_at=new Date();
            request.body.isAvailable=true;
            const comments=await commentModel.create(...request.body);
            if(comments){
                response.status(200).json({comments,isCreated:false});
            }else{
                response.status(406).json({msg: 'Does not find any content following the criteria given by the user agent', isCreated:false});
            }

        }catch (e) {
            next({error:e.message,msg:'might be server error'});
            console.log(e.message);
        }
    }else {
        response.status(400).json(errors);
    }

};

const getCommentById=async function (request,response,next) {
    const errors=validationResult(request)
    if(errors.isEmpty()){
        const _id=request.body.id ? request.body.id:request.params.id;
        try{

            const comments=await commentModel.findById({_id});
            if(comments){
                response.status(200).json(comments);
            }else{
                response.status(401).json({msg: 'Unauthorized', ...comments, isAvailable: comments.isAvailable});
            }

        }catch (e) {
            next({error:e.message,msg:'might be server error'});
            console.log(e.message);
        }
    }else {
        response.status(400).json(errors);
    }

};
const deleteCommentById=async function (request,response,next) {
    const errors=validationResult(request)
    if(errors.isEmpty()){
        const _id=request.body.id ? request.body.id:request.params.id;
        try{

            const comments=await commentModel.findByIdAndDelete({_id});
            if(comments){
                response.status(200).json(comments);
            }else{
                response.status(401).json({msg: 'Unauthorized', ...comments, isDeleted: comments.isAvailable});
            }

        }catch (e) {
            next({error:e.message,msg:'might be server error'});
            console.log(e.message);
        }
    }else {
        response.status(400).json(errors);
    }

};
const getCommentsByUserId=async function (request,response,next) {
    const errors=validationResult(request)
    if(errors.isEmpty()){
        const _id=request.body.id ? request.body.id:request.params.id;
        try{

            const comments=await commentModel.findById({_id});
            if(comments){
                response.status(200).json(comments);
            }else{
                response.status(401).json({msg: 'Unauthorized', isAvailable: comments.isAvailable});
            }

        }catch (e) {
            next({error:e.message,msg:'might be server error'});
            console.log(e.message);
        }
    }else {
        response.status(400).json(errors);
    }

};
const updateCommentById=async function (request,response,next) {
    const errors=validationResult(request)
    if(errors.isEmpty()){
        const _id=request.body.id ? request.body.id:request.params.id;
        try{
            const update=await commentModel.findById({_id});
            if(update){
                update.comments=request.body.comments;
                update.save()
                response.status(200).json(update);
            }else{
                response.status(401).json({msg: 'Unauthorized', isAvailable: update.isAvailable});
            }

        }catch (e) {
            next({error:e.message,msg:'might be server error'});
            console.log(e.message);
        }
    }else {
        response.status(400).json(errors);
    }

};
module.exports= {
    getCommentById,
    createComment,
    updateCommentById,
    deleteCommentById,
    getCommentsByUserId,
};

