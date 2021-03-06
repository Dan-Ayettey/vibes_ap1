const { roles } = require('../../models/roleModel');

const grantAccess = function(action, resource) {
    return async (req, res, next) => {

        try {
            const permission = roles.can(req.user.role)[action](resource);
            if (!permission.granted) {
                return res.status(401).json({
                    error: "You don't have enough permission to perform this action"
                });
            }
            next();
        } catch (error) {
            next(error);
        }
    };
};

const allowIfLoggedIn = async (req, res, next) => {

    try {

        const user = res.locals.loggedInUser;
        if (user){
            req.user = user;
            next();
        }else {
            return res.status(401).json({
                error: "You need to be logged in to access this route"
            });
        }



    } catch (error) {
        next(error);
    }
};

module.exports={
    allowIfLoggedIn,
    grantAccess,
};
