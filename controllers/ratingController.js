// import libs
const {validationResult}=require('../configurations/schema/ratingSchema');
const {ratingModel}=require('../models/ratingModel');
//composites or constructs
const createRating=async function (request,response,next) {
    const errors=validationResult(request)
    if(errors.isEmpty()){
        request.body.id=request.body.id ? request.body.id:request.params.id;
        try{
            request.body.created_at=new Date();
            request.body.isAvailable=true;
            const ratings=await ratingModel.create(...request.body);
            if(ratings){
                response.status(200).json({ratings,isCreated:false});
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

const getRatingById=async function (request,response,next) {
    const errors=validationResult(request)
    if(errors.isEmpty()){
        const _id=request.body.id ? request.body.id:request.params.id;
        try{

            const ratings=await ratingModel.findById({_id});
            if(ratings){
                response.status(200).json(ratings);
            }else{
                response.status(401).json({msg: 'Unauthorized', ...ratings, isAvailable: ratings.isAvailable});
            }

        }catch (e) {
            next({error:e.message,msg:'might be server error'});
            console.log(e.message);
        }
    }else {
        response.status(400).json(errors);
    }

};
const deleteRatingById=async function (request,response,next) {
    const errors=validationResult(request)
    if(errors.isEmpty()){
        const _id=request.body.id ? request.body.id:request.params.id;
        try{

            const ratings=await ratingModel.findByIdAndDelete({_id});
            if(ratings){
                response.status(200).json(ratings);
            }else{
                response.status(401).json({msg: 'Unauthorized', ...ratings, isDeleted: ratings.isAvailable});
            }

        }catch (e) {
            next({error:e.message,msg:'might be server error'});
            console.log(e.message);
        }
    }else {
        response.status(400).json(errors);
    }

};
const getRatingsByUserId=async function (request,response,next) {
    const errors=validationResult(request)
    if(errors.isEmpty()){
        const _id=request.body.id ? request.body.id:request.params.id;
        try{

            const ratings=await ratingModel.findById({_id});
            if(ratings){
                response.status(200).json(ratings);
            }else{
                response.status(401).json({msg: 'Unauthorized', isAvailable: ratings.isAvailable});
            }

        }catch (e) {
            next({error:e.message,msg:'might be server error'});
            console.log(e.message);
        }
    }else {
        response.status(400).json(errors);
    }

};
const updateRatingById=async function (request,response,next) {
    const errors=validationResult(request)
    if(errors.isEmpty()){
        const _id=request.body.id ? request.body.id:request.params.id;
        try{
            const update=await ratingModel.findById({_id});
            if(update){
                update.ratings=request.body.ratings;
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
    getRatingById,
    createRating,
    updateRatingById,
    deleteRatingById,
    getRatingsByUserId,
};

