
const {checkSchema,validationResult}=require('express-validator');

const createChatSchema=checkSchema({
    text: {
        in: ["body"],
        isString:true,
        exists:true,
        errorMessage: [true, 'Message from  are needed'],
    },
    html: {
        in: ["body"],

    },

    sent_at: {
        in: ["body"],
    },
    fromUser: {
        isEmpty:false,
        isEmail:true,
        exists:true,
        isString:true,
        errorMessage:'From user is needed and must be email',

    },
    toUser: {
        isEmpty:false,
        isEmail:true,
        exists:true,
        isString:true,
        errorMessage:'To user is needed and must be email',

    },


});

const getChatByUserIdSchema=checkSchema({

    fromUser:{
        in:['params','body'],
        isString:true,
        isEmpty:false,
        errorMessage:'From user email is needed and must not be left empty'

    },
});
const getSentByIdSchema=checkSchema({

    fromUser:{
        in:['body'],
        isString:true,
        isEmpty:false,
        errorMessage:'From user email is needed and must not be left empty'

    },
    toUser:{
        in:['body'],
        isString:true,
        isEmpty:false,
        errorMessage:'To user email is needed and must not be left empty'

    },
});
const getChatByIdSchema =checkSchema({


    cid:{
        in:['body',"params"],
        isString:true,
        isEmpty:false,
        errorMessage:'Chat id item must not be left empty'

    },

});

const updateChatSchema=checkSchema({
    items:{
        in:['body'],
        isArray:true,
        isEmpty:false,
        errorMessage:'Must be items and must not be left empty ex:items[(quantity:900001,' +
            'id: 7929' +
            'properties: { '+
            'First name:Joe' +
            '})] or create your own'


    },

    id:{
        in:['body',"params"],
        isString:true,
        isEmpty:false,
        errorMessage:'User id must not be left empty'


    },

});


module.exports={
    createChatSchema,getChatByIdSchema,getChatByUserIdSchema,updateChatSchema,getSentByIdSchema,
    validationResult
};
