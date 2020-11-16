/**
 * Created by ictte on 09/11/2020.
 */
const {checkSchema,validationResult}=require('express-validator');
const createFileSchema=checkSchema({
    data:{
        in:['body'],
        isArray:true,
        isEmpty:false,
        errorMessage:'Needed file and must not be left empty'


    },

    id:{
        in:["params","body"],
        isString:true,
        isEmpty:false,
        errorMessage:'User id and must not be left empty'

    },


});
const getFilesSchema=checkSchema({


    id:{
        in:["params","body"],
        isString:true,
        isEmpty:false,
        errorMessage:'User  id must not be left empty'


    },


});
const getFileByUserIdSchema=checkSchema({


    id:{
        in:['body',"params"],
        isString:true,
        isEmpty:false,
        errorMessage:'User id must not be left empty'


    },

    cid:{
        in:['body',"params"],
        isString:true,
        isEmpty:false,
        errorMessage:'Card id must not be left empty'


    },
});
const getFileByIdSchema =checkSchema({


    fid:{
        in:['body',"params"],
        isString:true,
        isEmpty:false,
        errorMessage:'File id file must not be left empty'

    },

});
const getFileProductsByUserIdSchema=checkSchema({

    id:{
        in:['body',"params"],
        isString:true,
        isEmpty:false,
        errorMessage:'User id must not be left empty'


    },
});
const updateFileSchema=checkSchema({
    file:{
        in:['body'],
        isArray:true,
        isEmpty:false,
        errorMessage:'Must be file and must not be left empty '


    },

    id:{
        in:['body',"params"],
        isString:true,
        isEmpty:false,
        errorMessage:'User id must not be left empty'


    },

});


module.exports={
    createFileSchema,
    getFilesSchema,
    validationResult,
    updateFileSchema,
    getFileProductsByUserIdSchema,
    getFileByUserIdSchema,
    getFileByIdSchema
};
