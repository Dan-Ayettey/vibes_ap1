//instances
const {userModel,isValidPassword,getHashedPassword,customerModel}=require('../models/userModel');
const jwt=require('jsonwebtoken');
require('dotenv').config();
const stripe = require('stripe')(process.env['STRIPE_KEY']);
const {validationResult} = require("../configurations/schema/userSchema");
//Set constructs or composites
const createUser=async function (request,response,next){
 const errors=validationResult(request);


if(errors.isEmpty()) {


    request.body.created_at=new Date();
    const {role,email,telephoneNumber}=request.body;
    request.body._links = [
        {
            rel: 'self', href: ['v1/users/auth', '/'], action: 'POST',
            types: ["application/json"], gives: 'authorization token'
        },
        {
            rel: 'self', href: ['v1/', '/'], action: 'GET',
            types: ["application/json"]
        },

        {
            rel: 'self', href: '/v1/admins/managed-users/', action: 'GET',
            types: ["application/json"], authorization: 'token'
        },
        {
            rel: 'self', href: '/v1/users/:id', action: 'GET',
            types: ["application/json"], authorization: 'token'
        },
        {
            rel: 'self', href: '/v1/users/:id', action: 'PUT',
            types: ["application/x-www-form-urlencoded"], authorization: 'token'
        },
        {
            rel: 'self', href: '/v1/users/deactivated-account/:id', action: 'PUT',
            types: ["application/x-www-form-urlencoded"], authorization: 'token'
        },
        {
            rel: 'self', href: '/v1/users/:id/activated-account', action: 'POST',
            types: ["application/x-www-form-urlencoded"], authorization: 'token'
        },
        {
            rel: 'self', href: '/v1/users/:id/renewed-secret', action: 'PUT',
            types: ["application/x-www-form-urlencoded"], authorization: 'token'
        },
        {
            rel: 'self', href: '/v1/users/:id/renewed-password', action: 'PUT',
            types: ["application/x-www-form-urlencoded"], authorization: 'token'
        },
        {
            rel: 'self', href: '/v1/admins/managed-user/:id/deactivate-account', action: 'PUT',
            types: ["application/x-www-form-urlencoded"], authorization: 'token'
        },
        {
            rel: 'self', href: '/v1/admins/managed-user/:id/activate-account', action: 'PUT',
            types: ["application/x-www-form-urlencoded"], authorization: 'token'
        },
        {
            rel: 'self', href: 'localhost/v1/admins/managed-users/id', action: 'DELETE',
            types: [], authorization: 'token'
        },
        {
            rel: 'self', href: 'localhost/v1/admins/managed-users/id', action: 'PUT',
            types: [], authorization: 'token'
        },
    ];
    try {
        const find=await userModel.findOne(({email}) || ({telephoneNumber}));
        if(!find){
                request.body.isActive = true;
                request.body.isAvailable = true;
                request.body.role=role||'basic';
                await stripe.customers.create(
                    {email: email || telephoneNumber}
                ).then((customer) =>{
                     request.body.customer=customer;
                } ).then((customer)=>{return customer;}).
                catch((err) => {
                   console.log(err);
                });
                const customerData=request.body.customer;
                request.body._customer_id=request.body.customer.id;
               delete request.body.customer;
                request.body._token=jwt.sign({role,email,isActive:request.body.isActive},process.env.JWT_SECRET,{
                    expiresIn: '1d'
                });

              const user = await userModel.create(request.body);
              if(user){
                  request.body.customer=customerData;
                  request.body._user_id=user._id;
                  await customerModel.create(request.body);
                  response.status(201).json({
                      user,
                      isCreated: true,
                  });
              }else {
                  response.status(406).json({msg: 'Does not find any content following the criteria given by the user agent', isAvailable: false, isActive: false});
              }

            }else {
                response.status(409).json({msg: 'Conflict', isAvailable: find.isAvailable, isActive: find.isActive});
            }

    } catch (e) {
        next({error:e.message,msg:'might be server error'});
       console.log(e.message);
    }
}else {
    response.status(400).json(errors);
}
};
const grantAuthenticationWithAToken=async function (request){
    const {email,password,telephoneNumber}=request.body;
      const user=await userModel.findOne(({email}) || ({telephoneNumber}));
        if(user){
            const isAvailable=isValidPassword(password,user.password) || telephoneNumber === user.telephoneNumber &&
                email===user.email && user.isActive;
                if(isAvailable){
                    user._token= await jwt.sign({role:user.role,email:user.email,password:password,id:user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
                    await user.save();
                    return {user};
                }else if(user.email === email  && user.isActive===false){
                    return {isActive:user.isActive,isNeededActivation:true};
                }else {
                    return false;
                }

        }else {
            return false;
        }
    };
const authorizeUser=async function (request,response){
    const errors=validationResult(request);
    if(errors.isEmpty()) {
        const {user} = await grantAuthenticationWithAToken(request);
         if(user){
             if (user.isActive) {
                 response.status(200).json({user,isAuthorized:true});
             }else {
                 response.status(401).json({msg: 'Unauthorized', isActive: user.isActive});
             }
         } else {
            response.status(401).json({msg: 'Unauthorized', isAuthorized: false});
        }
    }else {
        response.status(400).json(errors);
    }
};
const getUsers=async function (request,response,next){

    try {
         const users=await userModel.find({});
            if(users){
                response.status(200).json({numberOfRegisters:users.length,users,isAvailable:userModel.isAvailable});
            }else {
                response.status(401).json({msg:'Unauthorized',isAvailable:userModel.isAvailable});
            }
    }catch (e){
        next({error:e.message,msg:'might be server error'});
       console.log(e.message);
    }
};
const searchUsers=async function (request,response,next) {
    const errors = validationResult(request);
    if (errors.isEmpty()) {
        const  firstName= request.body.find;
        const  lastName=request.body.find;
        try{
            const users = await userModel.find({firstName} || {lastName}  );
            if (users) {
                response.status(200).json({numberOfRegisters: users.length, users, isAvailable: userModel.isAvailable});
            } else {
                response.status(401).json({msg: 'Unauthorized', isAvailable: userModel.isAvailable});
            }
        } catch (e) {
            next({error: e.message, msg: 'might be server error'});
            console.log(e.message);
        }
    }
};
const getUserById=async function (request,response,next){
    const errors=validationResult(request);
    if(errors.isEmpty()) {
        const _id=request.body.id ? request.body.id:request.params.id;
        try {
            const user = await userModel.findOne({_id});
            if (user){
                if(user.isActive){
                    response.status(200).json({user, isAvailable: user.isAvailable});
                }else {
                    response.status(401).json({msg: 'Unauthorized',isAvailable: user.isAvailable,isActive: user.isActive});
                }

            } else {
                response.status(401).json({msg: 'Unauthorized', ...user, isAvailable: userModel.isAvailable});
            }
        } catch (e) {
            next({error:e.message,msg:'might be server error'});
           console.log(e.message);
        }
    }else {
        response.status(400).json(errors);
    }
};
const deactivateUserById= async function (request,response,next){
    const errors=validationResult(request);
    if(errors.isEmpty()) {
        request.body.deactivated_at=new Date();
        const _id=request.body.id ? request.body.id:request.params.id;
        try {
            const user = await userModel.findOne({_id});
            if(user.id){
                if (user){
                    user.isActive = false;
                    user.deactivated_at=new Date();
                    const save=await user.save();
                    response.status(200).json({id: user.id, isDeactivated:!save.isActive});
                } else {
                    response.status(401).json({msg: 'Unauthorized', isDeactivated: false});
                }
            } else{
                response.status(403).json({msg: 'Unauthorised to access the resource', isDeactivated:true});
            }
        } catch (e) {
            next({error:e._message,msg:'might be server error'});
           console.log(e.message);
        }
    }else {
        response.status(400).json(errors);
    }
};
const deleteUserById= async function (request,response,next){
    const errors=validationResult(request);
    if(errors.isEmpty()) {
        const _id=request.body.id ? request.body.id:request.params.id;
        try {
            const user = await userModel.findOne({_id});
            if(user){
                await userModel.findOneAndDelete({_id});
                response.status(200).json({id:user.id, isDeleted: true});
            } else {
                response.status(401).json({msg: 'Unauthorized', isDeleted:  false});
            }
        } catch (e) {
            next({error:e._message,msg:'might be server error'});
           console.log(e.message);
        }
    }else {
        response.status(400).json(errors);
    }
};
const activateUser= async function (request,response,next){
    const errors=validationResult(request);
    if(errors.isEmpty()) {
        const {email,telephone,password,secret}=request.body;
        try {
            const user = await userModel.findOne(({email}) || ({telephone}));
            if (!user.isActive && isValidPassword(password,user.password) || user.secret ===secret) {
                user.isActive=true;
                user.activated_at=new Date();
                const save=await user.save();
                response.status(200).json({id:save.id, isActive: save.isActive});
            } else {
                response.status(401).json({msg: 'Unauthorized', isActive:  false});
            }
        } catch (e) {
            next({error:e.message,msg:'might be server error'});
           console.log(e.message);
        }
    }else {
        response.status(400).json(errors);
    }
};
const updateUserById=async function (request,response,next){
    const errors=validationResult(request);
    if(errors.isEmpty()) {
        request.body.updated_at=new Date();
        const _id=request.body.id ? request.body.id:request.params.id;
        delete request.body.id;
        delete request.email;
        delete request.password;
        try {
            const user = await userModel.findOne({_id});
            if (user) {
                if(user.isActive){
                    const find = await userModel.findByIdAndUpdate({_id},{...request.body});
                    response.status(200).json({updated_id:find.id,updated_at:find.updated_at, isUpdated: true});
                }else {
                    response.status(401).json({msg: 'Unauthorized', isUpdated: false});
                }
            } else {
                response.status(401).json({msg: 'Unauthorized', ...user, isUpdated: false});
            }
        } catch (e) {
            next({error:e.message,msg:'might be server error'});
           console.log(e.message);
        }


    }else {
        response.status(400).json(errors);
    }
};
const renewSecretById=async function (request,response,next){
    const errors=validationResult(request);
    if(errors.isEmpty()) {
        request.body.updated_at=new Date();
        const _id=request.body.id ? request.body.id:request.params.id;
        try {
            const user = await userModel.findOne({_id});
            if (user) {
                if(user.isActive){
                    const user = await userModel.findOne({_id});
                     user.secretMessage=getHashedPassword(request.body.secretMessage);
                     await user.save();
                         response.status(200).json({id:user.id,updated_at:user.updated_at, isUpdated: true});
                }else {
                    response.status(401).json({msg: 'Unauthorized', isUpdated: false});
                }
            } else {
                response.status(401).json({msg: 'Unauthorized', ...user, isUpdated: false});
            }
        } catch (e) {
            next({error:e.message,msg:'might be server error'});
           console.log(e.message);
        }


    }else {
        response.status(400).json(errors);
    }
};
const renewPasswordById=async function (request,response,next){
    const errors=validationResult(request);
    if(errors.isEmpty()) {
        const {id,password}=request.body;
        request.body.updated_at=new Date();
        const _id=id;
        try {
            const user = await userModel.findOne({_id});
            if (user && isValidPassword(password,getHashedPassword(password))) {
                user.updated_at=new Date();
                user.password=password;
                const save=await user.save();
                if(save){
                    response.status(200).json({id: user.id, isUpdated:!save.isActive});
                }else {
                    response.status(401).json({msg: 'Unauthorized', isUpdated: false});
                }
            } else {
                response.status(401).json({msg: 'Unauthorized', isActive:  false});
            }
        } catch (e) {
            next({error:e.message,msg:'might be server error'});
           console.log(e.message);
        }
    }else {
        response.status(400).json(errors);
    }
};
const veryToken=async function (request,  response, next){
    if (request.headers.authorization) {
        const accessToken = request.headers.authorization.slice(7, 1000);
        try {
            const verify=await jwt.verify(accessToken, process.env.JWT_SECRET);
            // Check if token has expired
            if (verify.exp < Date.now().valueOf() / 1010) {
                response.status(401).json({error: "JWT token has expired, please login to obtain a new one"});
            } else {
                response.locals.loggedInUser = verify;
                next();
            }
        } catch (e) {
            next({error: e.name, msg: 'might be server error or '+e.message});
            console.log(e.message);
        }

    } else {
        next();
    }
};

const getCustomerById=async function (request,response,next) {
    const  errors= validationResult(request);
    const _user_id=request.body.id ? request.body.id:request.params.id;

    if(errors.isEmpty()){
        try{
            const broker=await customerModel.findOne({_user_id},{});
            if(broker){
                response.status(200).json({
                    broker,
                    isAvailable: true,
                });
            }else {
                response.status(401).json({msg: 'Needed unauthorized to perform this operation, needed customer_id or user id', isAuthorized: false});
            }

        }catch (e) {
            next(e.message);
            throw  new Error(e);
        }



    }else {
        response.status(400).json(errors);
    }
};
module.exports={
    renewSecretById,
    createUser,
    getUsers,
    renewPasswordById,
    authorizeUser,
    getUserById,
    deleteUserById,
    getCustomerById,
    activateUser,
    deactivateUserById,
    searchUsers,
    updateUserById,
    veryToken

};


