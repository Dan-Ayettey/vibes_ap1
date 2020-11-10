
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
    user_id: {
        in: ["body","params"],
        isString: String,
        isEmpty:false,
        errorMessage:  'user id is needed',

    },
    sent_at: {
        in: ["body"],
    },
    fromUser: {
        isEmpty:false,
        exists:true,
        isString:true,
        errorMessage:'From user is needed',

    },
    toUser: {
        isEmpty:false,
        exists:true,
        isString:true,
        errorMessage:'To user is needed',

    },


});

const getChatsSchema=checkSchema({


    id:{
        in:["params","body"],
        isString:true,
        isEmpty:false,
            errorMessage:'User  id must not be left empty'


    },


});
const getChatByUserIdSchema=checkSchema({


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
const getChatByIdSchema =checkSchema({


    cid:{
        in:['body',"params"],
        isString:true,
        isEmpty:false,
        errorMessage:'Chat id item must not be left empty'

    },

});
const getChatProductsByUserIdSchema=checkSchema({

    id:{
        in:['body',"params"],
        isString:true,
        isEmpty:false,
        errorMessage:'User id must not be left empty'


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
    createChatSchema,
    getChatsSchema,
    validationResult,
    updateChatSchema,
    getChatProductsByUserIdSchema,
    getChatByUserIdSchema,
    getChatByIdSchema
};
