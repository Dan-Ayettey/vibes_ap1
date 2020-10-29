//instances
const {cartModel}=require('../models/cartModel');
const {validationResult} = require("../configurations/schema/cartSchema");

//Constructs
const createCartProduct=async function (request,response,next) {

    const errors=validationResult(request);
    if(errors.isEmpty()){
        request.body._links = [

            {
                rel: 'self', href: '/v1/carts/users/:id', action: 'POST',
                types: ["application/x-www-form-urlencoded"], authorization: 'token'
            },
            {
                rel: 'self', href: '/v1/carts/:cid/managed-carted-user/:id', action: 'PUT',
                types: ["application/x-www-form-urlencoded"], authorization: 'token'
            },
            {
                rel: 'self', href: '/v1/carts/:id', action: 'GET',
                types: ["application/x-www-form-urlencoded"], authorization: 'token'
            },
            {
                rel: 'self', href: '/v1/carts/users/:id', action: 'GET',
                types: ["application/x-www-form-urlencoded"], authorization: 'token'
            },
            {
                rel: 'self', href: '/v1/carts/:cid/managed-carted-user/:id', action: 'DELETE',
                types: ["application/x-www-form-urlencoded"], authorization: 'token'
            },
            {
                rel: 'self', href: '/v1/admins/managed-carted-user/:id', action: 'PUT',
                types: ["application/x-www-form-urlencoded"], authorization: 'token'
            },
            {
                rel: 'self', href: '/v1/admins/managed-carted-users/:id', action: 'DELETE',
                types: ["application/x-www-form-urlencoded"], authorization: 'token'
            },
        ];
        try {

            request.body._user_id=request.body.id? request.body.id:request.params.id;
            const cart = await cartModel.create(request.body);
            if(cart){
                response.status(201).json({
                    cart,
                    isCreated: true,
                });
            }else {
                response.status(401).json({msg: 'Unauthorized',isCreated:false});
            }

        }catch (e) {
             next(e.message);
            console.log(e);
        }
    }else {
        response.status(401).json(errors);
    }
};
const getCartProducts=async function (request,response,next) {

        try {
            const cart=await cartModel.find({});
             if(cart){
                response.status(200).json(cart);
            }
            else {
                response.status(401).json({msg: 'Unauthorized'});
            }
        }catch (e) {
            next(e._message);
           console.log(e);
        }
};
const getCartProductsByUserId=async function (request,response,next) {
      const errors =validationResult(request);

       if(errors.isEmpty()){
           try {
               const _user_id=request.body.id ? request.body.id:request.params.id;
               const cart=await cartModel.find({_user_id});
               if(cart){
                   response.status(200).json(cart);
               }
               else {
                   response.status(401).json({msg: 'Unauthorized'});
               }
           }catch (e) {
               next(e.message);
              console.log(e);
           }
       }else {
           response.status(401).json(errors);
       }




};
const getCartProductById=async function (request,response,next) {
    const _id=request.body.cart_id ? request.body.cart_id:request.params.cid;
    request.body.id="dfd"
    const errors=validationResult(request);
    console.log(request.body.id)
    if(errors.isEmpty()){
        try {
            const cart=await cartModel.findOne({_id});
             if(cart){
                 const id=request.body.id ? request.id :request.params.id;
                 if(id===cart._user_id){
                     response.status(200).json(cart);
                 }else {
                     response.status(200).json(cart);
                 }

            }
            else {
                 response.status(401).json({msg: 'Unauthorized'});
            }
        }catch (e) {
            next(e.message);
           console.log(console,e);
        }

    }else {
        response.status(401).json(errors);
    }
};
const deleteCartProductById=async function (request,response,next) {
    const _id=request.body.cart_id ? request.body.cart_id:request.params.cart_id;
    const errors=validationResult(request);
    if(errors.isEmpty()){
        try {
            const cart=await cartModel.findOneAndDelete({_id});
            if(cart){
                response.status(200).json({id:cart.id,msg: 'deleted',isDeleted:true});
            }
            else {
                response.status(401).json({msg: 'Unauthorized',isDeleted:false});
            }
        }catch (e) {
            next(e.message);
           console.log(e);
        }

    }else {
        response.status(401).json(errors);
    }
};
const updateCartProductById=async function (request,response,next) {
    const _id=request.body.cart_id ? request.body.cart_id:request.params.cid;
    const errors=validationResult(request);

    if(errors.isEmpty()){
        try {
            const cart=await cartModel.findOne({_id});
            if(cart){
            cart.items=request.body.items;
            await cart.save();
            response.status(200).json(cart);
            } else {
                response.status(401).json({msg: 'Unauthorized',isUpdated:false});
            }

        }catch (e) {
            next(e.message);
           console.log(e);
        }

    }else {
        response.status(401).json(errors);
    }
};

//modules
module.exports={
    updateCartProductById,
    getCartProductById,
    getCartProducts,
    createCartProduct,
    getCartProductsByUserId,
    deleteCartProductById,

};
