
const {checkSchema,validationResult}=require('express-validator');

const createContactSchema=checkSchema({
    email: {
        in:['body'],
        isEmpty:false,
        exists:true,
        isEmail:true,
        errorMessage:'contact email is needed',

    },
    id: {
        in:['body',"params"],
        isEmpty:false,
        isString:true,
        exists:true,
        errorMessage:'User id is needed and',

    },


});
const getFindOneAndUpdateSchema=checkSchema({


    id:{
        in:['body',"params"],
        isString:true,
        exists:true,
        isEmpty:false,
        errorMessage:'User id must not be left empty'


    },

    index:{
        in:['body'],
        isNumeric:true,
        exists:true,
        isEmpty:false,
        errorMessage:'Item index must not be left empty'
    },

});
const getContactsByUserIdSchema=checkSchema({


    user_id:{
        in:['body',"params"],
        isString:true,
        exists:true,
        isEmpty:false,
        errorMessage:'User id must not be left empty'


    },

});
const deleteContactsByIdSchema=checkSchema({


    cid:{
        in:['body',"params"],
        isString:true,
        exists:true,
        isEmpty:false,
        errorMessage:'User id must not be left empty'


    },

});
const getContactByIdSchema =checkSchema({


    cid:{
        in:['body',"params"],
        isString:true,
        exists:true,
        isEmpty:false,
        errorMessage:'Contact id item must not be left empty'

    },

});

const updateContactByIdSchema=checkSchema({
    details:{
        in:['body'],
        exists:true,
        errorMessage:'Details and must not be left empty ex:Details[(quantity:900001,' +
        'id: 7929' +
        'properties: { '+
        'First name:Joe' +
        '})] or create your own'


    },
    detailsIndex:{
        in:['body'],
        exists:true,
        errorMessage:'Details index to update, make it empty or null if you do not indent to update details'
    },

    cid:{
        in:['body',"params"],
        isString:true,
        isEmpty:false,
        errorMessage:'Contact id must not be left empty'


    },

});


module.exports={
    createContactSchema,
    validationResult,
    updateContactByIdSchema,
    getContactsByUserIdSchema,
    getContactByIdSchema,
    getFindOneAndUpdateSchema,
    deleteContactsByIdSchema
};
