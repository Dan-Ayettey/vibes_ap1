const {checkSchema,validationResult}=require('express-validator');
const createCartSchema=checkSchema({
    items:{
        in:['body'],
        isArray:true,
        isEmpty:false,
        errorMessage:'Needed items and must not be left empty'


    },

    id:{
        in:["params","body"],
        isString:true,
        isEmpty:false,
        errorMessage:'User id and must not be left empty'

    },


});

const getCartByUserIdSchema=checkSchema({


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
const getCartByIdSchema =checkSchema({


    cid:{
        in:['body',"params"],
        isString:true,
        isEmpty:false,
        errorMessage:'Cart id item must not be left empty'

    },

});
const getCartProductsByUserIdSchema=checkSchema({

    id:{
        in:['body',"params"],
        isString:true,
        isEmpty:false,
        errorMessage:'User id must not be left empty'


    },
});
const updateCartSchema=checkSchema({
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
    createCartSchema,
    validationResult,
    updateCartSchema,
    getCartProductsByUserIdSchema,
    getCartByUserIdSchema,
    getCartByIdSchema
};
